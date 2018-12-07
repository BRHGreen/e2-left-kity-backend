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
    kittyStatement: [kittyStatement]
    conterParties: [String]
  }

  type Query {
    allHousemates: [Housemate!]
    getHousemate(id: Int!): Housemate!
}
`;
