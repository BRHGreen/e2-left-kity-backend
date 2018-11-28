export default `
  type Housemate {
    id: Int!
    firstName: String,
    lastName: String,
    username: String,
    email: String,
    kittyReference: String,
    isCurrentHousemate: Boolean,
  }

  type Query {
    allHousemates: [Housemate!]
    getHousemate(id: Int!): Housemate!
}
`