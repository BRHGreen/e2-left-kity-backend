import Sequelize from "sequelize";

const Op = Sequelize.Op;

export default {
  Housemate: {
    kittyStatement: ({ conterParties, id }, args, { models }) => {
      console.log(">>>>>>", conterParties);
      return models.KittyStatement.findAll({
        where: {
          owner: id
          // test: {
          //   [Op.overlap]: conterParties
          // }
        }
      });
    }
  },

  Query: {
    allHousemates: (parent, args, { models }) => models.Housemate.findAll(),

    housemateById: (parent, { id }, { models }) => {
      return models.Housemate.findOne({ where: { id } });
    }
  }
};
