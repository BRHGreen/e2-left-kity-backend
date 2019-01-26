import kittyStatement from "../schema/kittyStatement";

export default (sequelize, DataTypes) => {
  const KittyStatement = sequelize.define("kittyStatement", {
    date: DataTypes.DATE,
    counterParty: DataTypes.ARRAY(DataTypes.STRING),
    reference: DataTypes.STRING,
    type: DataTypes.STRING,
    amount: DataTypes.FLOAT,
    balance: DataTypes.FLOAT,
    openingBalance: DataTypes.FLOAT,
    month: DataTypes.STRING,
    owner: DataTypes.INTEGER,
    paymentAssignee: DataTypes.INTEGER,
    counterParty: DataTypes.ARRAY(DataTypes.STRING),
    paymentForMonths: DataTypes.ARRAY(DataTypes.STRING)
  });

  KittyStatement.associate = models => {
    KittyStatement.belongsTo(models.Housemate, { foreignKey: "id" });
  };

  return KittyStatement;
};
