import Sequelize from "sequelize";
import { sequelize } from "../models";
import Moment from "moment";
import { extendMoment } from "moment-range";

const moment = extendMoment(Moment);

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
    },
    getPaymentsDueFromHousematesByHousemateId: (parent, { id }, { models }) => {
      return models.Housemate.findOne({ where: { id } });
    },
    getPaymentsDueFromHousematesForMonth: async (
      parent,
      { month },
      { models }
    ) => {
      const getDate = await models.KittyStatement.findAll({
        limit: 1,
        order: [["date", "DESC"]],
        attributes: ["month"]
      });

      const latestStatement = getDate[0].dataValues.month;

      const statements = await models.KittyStatement.findAll({
        attributes: ["month"],
        where: {
          month: month || latestStatement
        }
      });
      const housemates = await models.Housemate.findAll({
        attributes: ["id", "contributingFrom", "contributingTo"]
      });

      const paymentsDue = await housemates.map(({ dataValues: housemate }) => {
        const start = housemate.contributingFrom;
        const end = housemate.contributingTo;
        if (start && end) {
          console.log(">>>", start);

          const range = moment.range(start, end);
          const selectedMonth = new Date(
            moment(`02/${statements[0].dataValues.month}`, "DD MM YYYY").format(
              "YYYY MM DD"
            )
          );
          const isInDateRange = range.contains(selectedMonth);

          if (start === null || end === null) {
            return null;
          }
          if (isInDateRange) {
            return models.Housemate.findOne({
              where: {
                id: housemate.id
              },
              order: [["id"]]
            });
          }
        }
      });

      return paymentsDue;
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
