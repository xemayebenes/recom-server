export default `
  type Mutation {
    addMovie(externalId: Int!): Movie
    addSerie(externalId: Int!): Serie
  }
`;