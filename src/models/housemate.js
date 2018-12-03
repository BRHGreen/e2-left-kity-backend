import moment from "moment";
import KittyStatement from "./kittyStatement";

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

  Housemate.associate = models => {
    Housemate.hasMany(models.KittyStatement, { foreignKey: "owner" });
  };

  return Housemate;
};
