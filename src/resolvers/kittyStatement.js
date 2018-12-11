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

    assignHousemateToStatement: async (
      parent,
      { kittyId, newOwner },
      { models }
    ) => {
      try {
        await models.KittyStatement.update(
          { owner: newOwner },
          { where: { id: kittyId } }
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
