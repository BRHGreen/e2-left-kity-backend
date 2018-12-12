import Sequelize from "sequelize";
import { sequelize } from "../models";

const Op = Sequelize.Op;

export default {
  Housemate: {
    kittyStatement: ({ conterParties, id }, args, { models }) => {
      console.log(">>>>", conterParties);
      console.log("models.KittyStatement", models.KittyStatement);

      return models.KittyStatement.findAll({
        where: {
          counterParty: {
            [Op.overlap]: conterParties
          }
          // owner: id
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
