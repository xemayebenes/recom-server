export default `
  type Mutation {
    addMovie(externalId: Int!): UserMovie
    addSerie(externalId: Int!): UserSerie
  }
`;