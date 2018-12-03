export default {
  Housemate: {
    kittyStatement: ({ firstName, lastName }, args, { models }) => {
      console.log("models.KittyStatement>>>>", `${firstName}${lastName}`);
      return models.KittyStatement.findAll({
        where: {
          ownerName: `${firstName}${lastName}`
        }
      });
    }
  },

  Query: {
    allHousemates: (parent, args, { models }) => models.Housemate.findAll()
  }
};
