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
  },
  Mutation: {
    updateMonthsPaid: async (parent, { monthsPaid, owner }, { models }) => {
      console.log("monthsPaid", monthsPaid);
      try {
        await models.Housemate.update(
          {
            monthsPaid: sequelize.fn(
              "array_append",
              sequelize.col("monthsPaid"),
              monthsPaid
            )
          },
          {
            where: {
              id: owner
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
