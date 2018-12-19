import Sequelize from "sequelize";
import { sequelize } from "../models";

const Op = Sequelize.Op;

export default {
  Housemate: {
    kittyStatement: ({ id }, args, { models }) => {
      return models.KittyStatement.findAll({
        where: {
          owner: id
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
