import kittyStatement from "../schema/kittyStatement";

export default (sequelize, DataTypes) => {
  const KittyStatement = sequelize.define("kittyStatement", {
    date: DataTypes.DATE,
    counterParty: DataTypes.STRING,
    reference: DataTypes.STRING,
    type: DataTypes.STRING,
    amount: DataTypes.FLOAT,
    balance: DataTypes.FLOAT,
    openingBalance: DataTypes.FLOAT,
    month: DataTypes.STRING,
    owner: DataTypes.INTEGER
  });

  KittyStatement.associate = models => {
    KittyStatement.belongsTo(models.Housemate, { foreignKey: "id" });
  };

  return KittyStatement;
};
