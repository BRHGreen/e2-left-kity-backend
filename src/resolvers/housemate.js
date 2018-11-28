export default {
  Query: {
    allHousemates: (parent, args, { models }) => models.Housemate.findAll(),
  }
}