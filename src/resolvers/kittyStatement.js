import Sequelize from "sequelize";
import Moment from "moment";
import { extendMoment } from "moment-range";

const moment = extendMoment(Moment);

const Op = Sequelize.Op;

export default {
  KittyStatement: {
    housemate: ({ owner }, args, { models }) => {
      return models.Housemate.findOne({
        where: { id: owner }
      });
    }
  },

  Query: {
    getAllKittyStatements: (parent, args, { models }) =>
      models.KittyStatement.findAll({
        order: [["date", "DESC"]]
      }),
    getKittyStatementsByMonth: async (parent, args, { models }) => {
      const getDate = await models.KittyStatement.findAll({
        limit: 1,
        order: [["date", "DESC"]],
        attributes: ["month"]
      });

      const latestStatement = getDate[0].dataValues.month;

      return models.KittyStatement.findAll({
        where: {
          month: args.month || latestStatement
        },
        order: [["date", "DESC"]]
      });
    },

    getAllPayInKittyStatements: (parent, { amount }, { models }) => {
      return models.KittyStatement.findAll({
        where: {
          amount: { [Op.gt]: 0 }
        },
        order: [["date", "DESC"]]
      });
    },

    getPayInKittyStatementsByMonth: (parent, { month, amount }, { models }) => {
      return models.KittyStatement.findAll({
        where: {
          month,
          amount: { [Op.gt]: 0 }
        }
      });
    },

    getKittyStatementsById: (parent, { id }, { models }) => {
      return models.KittyStatement.findAll({
        where: { id }
      });
    },
    getKittyStatementsByOwnerId: (parent, { owner }, { models }) => {
      return models.KittyStatement.findAll({
        where: { owner }
      });
    },
    getPayInKittyStatementsByOwnerId: (
      parent,
      { owner, amount },
      { models }
    ) => {
      return models.KittyStatement.findAll({
        where: {
          owner,
          amount: { [Op.gt]: 0 }
        }
      });
    },

    getPaymentsDueForMonth: async (parent, args, { models }) => {
      const statements = await models.KittyStatement.findAll({
        attributes: ["month"]
      });
      const housemates = await models.Housemate.findAll({
        attributes: ["contributingFrom", "contributingTo"]
      });
      console.log(">>>", statements[1].dataValues);
      console.log(">>>", housemates[0].dataValues);

      const start = housemates[0].dataValues.contributingFrom;
      const end = housemates[0].dataValues.contributingTo;
      const range = moment.range(start, end);
      const isInDateRange = range.contains(
        new Date(
          moment(`01/${statements[1].dataValues.month}`, "DD MM YYYY").format()
        )
      );
      console.log(">>>", isInDateRange);
    }
  },
  Mutation: {
    createKittyStatement: async (parent, args, { models }) => {
      try {
        const newStatement = await models.KittyStatement.create({ ...args });

        const statementOwner = await models.Housemate.findOne({
          where: {
            counterParties: {
              [Op.overlap]: newStatement.dataValues.counterParty
            }
          }
        });

        if (statementOwner) {
          const updateStatementWithOwner = await models.KittyStatement.update(
            { owner: statementOwner.dataValues.id },
            {
              where: {
                counterParty: {
                  [Op.overlap]: statementOwner.dataValues.counterParties
                }
              }
            }
          );
        }

        return {
          ok: true
        };
      } catch (err) {
        return {
          ok: false,
          errors: console.log(err)
        };
      }
    },

    assignHousemateToStatement: async (parent, args, { models }) => {
      const { kittyId, newOwner } = args;
      try {
        const statement = await models.KittyStatement.findOne({
          where: { id: kittyId }
        });

        const housemate = await models.Housemate.findOne({
          where: { id: newOwner }
        });

        const {
          dataValues: { counterParties }
        } = housemate;

        await models.Housemate.update(
          {
            counterParties: counterParties
              ? [...counterParties, statement.counterParty]
              : [statement.counterParty]
          },
          { where: { id: newOwner } }
        );

        const updatedHousemate = await models.Housemate.findOne({
          where: { id: newOwner }
        });

        await models.KittyStatement.update(
          { owner: newOwner },
          {
            where: {
              [Op.or]: [
                {
                  counterParty: {
                    [Op.overlap]: updatedHousemate.dataValues.counterParties
                  }
                },
                { id: kittyId }
              ]
            }
          }
        );

        return {
          ok: true
        };
      } catch (err) {
        return {
          ok: false,
          errors: console.log(err)
        };
      }
    }
  }
};
