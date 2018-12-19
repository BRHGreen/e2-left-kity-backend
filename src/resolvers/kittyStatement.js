import Sequelize from "sequelize";
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
