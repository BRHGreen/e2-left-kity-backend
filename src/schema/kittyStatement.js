export default `
type KittyStatement {
    id: Int!,
    date: String,
    counterParty: String,
    reference: String,
    type: String,
    amount: Float,
    balance: Float,
    openingBalance: Float,
    month: String,
}
type KittyStatementResponse {
    ok: Boolean!
    errors: [Error!]
}
type Mutation {
    createKittyStatement(
      date: String,
      counterParty: String,
      reference: String,
      type: String,
      amount: Float,
      balance: Float,
      openingBalance: Float,
      month: String,
    ): KittyStatementResponse!,
}

type Query {
  getAllKittyStatements: [KittyStatement!]
}

type Query {
  getKittyStatementsByMonth(month: String!): [KittyStatement!]
}
`;

