import moment from "moment";
import KittyStatement from "./kittyStatement";
import Sequelize from "sequelize";

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
    paymentsMade: DataTypes.INTEGER,
    conterParties: DataTypes.ARRAY(DataTypes.STRING)
  });

  Housemate.associate = models => {
    Housemate.hasMany(models.KittyStatement, { foreignKey: "owner" });
  };

  return Housemate;
};
