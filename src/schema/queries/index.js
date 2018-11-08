import { gql } from 'apollo-server-express';

export default gql`
  type Query {
    searchFilms(searchText: String!, language: String): [SearchMovieItem]
      @cacheControl(maxAge: 86400)
    searchSeries(searchText: String!, language: String): [SearchSerieItem]
      @cacheControl(maxAge: 86400)
    getMovie(externalId: Int!, language: String): Movie
      @cacheControl(maxAge: 86400)
    getSerie(externalId: Int!, language: String): Serie
      @cacheControl(maxAge: 86400)
    getUserSeries(userId: String!): [UserSerie]
    getUserMovies(userId: String!): [UserMovie]
    getUserLastItems(userId: String!): [LastItem]
    getUserMovie(userId: String!, id: String!): UserMovie
    getUserSerie(userId: String!, id: String!): UserSerie
    notifications: [Notification]
    list(id: String!, userId: String!): List
    lists(userId: String!, type: String): [List]
  }
`;
