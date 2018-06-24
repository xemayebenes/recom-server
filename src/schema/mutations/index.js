export default `
  type Mutation {
    addMovie(externalId: Int!): UserMovie
    addSerie(externalId: Int!): UserSerie
    removeMovie(id: String!): String
    removeSerie(id: String!): String
    completeMovie(id: String!): UserMovie
    completeSerie(id: String!): UserSerie
  }
`;
