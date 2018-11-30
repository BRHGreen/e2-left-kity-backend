import moment from "moment";

export default (sequelize, DataTypes) => {
  const Housemate = sequelize.define("housemate", {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    kittyReference: DataTypes.STRING,
    isCurrentHousemate: DataTypes.BOOLEAN,
    contributingFrom: DataTypes.DATE,
    contributingTo: DataTypes.DATE,
    paymentsDue: DataTypes.INTEGER,
    paymentsMade: DataTypes.INTEGER
  });

  Housemate.findAll({
    attributes: ["contributingFrom", "contributingTo", "firstName"]
  }).then(res => {
    res.map(
      ({ dataValues: { contributingFrom, contributingTo, firstName } }) => {
        console.log(
          // payments due
          `${firstName}: ${moment(contributingTo).diff(
            moment(contributingFrom),
            "months"
          )}`
        );
      }
    );
  });

  Housemate.update(
    {
      paymentsDue: 5
    },
    {
      where: {
        username: "Matt"
      }
    }
  ).then(() => {});

  return Housemate;
};
