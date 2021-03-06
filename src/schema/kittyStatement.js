export default `
type KittyStatement {
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
    assignee: Housemate,
    owner: Int,
    paymentAssignee: Int,
    paymentForMonths: [String],
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

type Mutation {
  updatePaymentAssignee(
    kittyId: Int!
    assignee: Int!,
  ): kittyStatementResponse!
}

type Mutation {
  updatePaymentForMonths(
    kittyId: Int!
    months: [String]!,
  ): kittyStatementResponse!
}

type Query {
  getAllKittyStatements: [KittyStatement!]
}

type Query {
  getKittyStatementsByMonth(month: String): [KittyStatement!]
}

type Query {
  getKittyStatementsById(id: Int): [KittyStatement!]
}

type Query {
  getAllPayInKittyStatements: [KittyStatement!]
}

type Query {
  getPayInKittyStatementsByMonth(month: String): [KittyStatement!]
}

type Query {
  getKittyStatementsByOwnerId(owner: Int): [KittyStatement!]
}

type Query {
  getPayInKittyStatementsByOwnerId(owner: Int): [KittyStatement]
}
type Query {
  getLatestMonth: String!
}
type Query {
  getAvailableMonths: [String]
}
`;
