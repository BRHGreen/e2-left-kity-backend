export default `
type kittyStatement {
    id: Int!,
    date: String,
    counterParty: [String],
    reference: String,
    type: String,
    amount: Float,
    balance: Float,
    openingBalance: Float,
    month: String,
    housemate: Housemate,
    owner: Int
}
type kittyStatementResponse {
    ok: Boolean!
    errors: [Error!]
}
type Mutation {
    createKittyStatement(
      date: String,
      counterParty: [String],
      reference: String,
      type: String,
      amount: Float,
      balance: Float,
      openingBalance: Float,
      month: String,
    ): kittyStatementResponse!
}

type Mutation {
  assignHousemateToStatement(
    newOwner: Int,
    kittyId: Int
  ): kittyStatementResponse!
}

type Query {
  getAllKittyStatements: [kittyStatement!]
}

type Query {
  getKittyStatementsByMonth(month: String!): [kittyStatement!]
}

type Query {
  getKittyStatementsById(id: Int): [kittyStatement!]
}
`;
