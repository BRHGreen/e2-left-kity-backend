export default `
  type Housemate {
    id: Int!
    firstName: String,
    lastName: String,
    username: String,
    email: String,
    kittyReference: String,
    isCurrentHousemate: Boolean,
    contributingFrom: String,
    contributingTo: String,
    paymentsDue: Int,
    paymentsMade: Int,
    kittyStatement: [KittyStatement]
    counterParties: [[String]]
  }

  type housemateResponse {
    ok: Boolean!
    errors: [Error!]
  }

  type Mutation {
    updateMonthsPaid(
      owner: Int!
      monthsPaid: String,
    ): housemateResponse
  }

  type Query {
    allHousemates: [Housemate!]
    housemateById(id: Int): Housemate
  }
`;
