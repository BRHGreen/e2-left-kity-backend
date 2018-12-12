import Sequelize from "sequelize";
const Op = Sequelize.Op;

export default {
  Query: {
    getAllKittyStatements: (parent, args, { models }) =>
      models.KittyStatement.findAll({
        order: [["date", "DESC"]]
      }),
    getKittyStatementsByMonth: (parent, args, { models }) => {
      return models.KittyStatement.findAll({
        where: { month: args.month },
        order: [["date", "DESC"]]
      });
    },
    getKittyStatementsById: (parent, { id }, { models }) => {
      return models.KittyStatement.findAll({
        where: { id }
      });
    }
  },
  Mutation: {
    createKittyStatement: async (parent, args, { models }) => {
      try {
        await models.KittyStatement.create({ ...args });
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
        // find kitty by id
        const statement = await models.KittyStatement.findOne({
          where: { id: kittyId }
        });

        // find the user by id
        const housemate = await models.Housemate.findOne({
          where: { id: newOwner }
        });

        const {
          dataValues: { counterParties }
        } = housemate;

        // update housemate counterparties
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
