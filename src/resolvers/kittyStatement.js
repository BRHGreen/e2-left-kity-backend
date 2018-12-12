import sequelize from "sequelize";

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
        await models.KittyStatement.update(
          { owner: newOwner },
          { where: { id: kittyId } }
        );
        const statement = await models.KittyStatement.findOne({
          where: { id: kittyId }
        });
        const housemate = await models.Housemate.findOne({
          where: { id: newOwner }
        });

        const {
          dataValues: { conterParties }
        } = housemate;

        models.Housemate.update(
          {
            conterParties: conterParties
              ? [...conterParties, statement.counterParty]
              : [statement.counterParty]
          },
          { where: { id: newOwner } }
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
