
export default (sequelize, DataTypes) => {
  const Housemate = sequelize.define('housemate', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    kittyReference: DataTypes.STRING,
    isCurrentHousemate: DataTypes.BOOLEAN,
  })
  return Housemate
}
