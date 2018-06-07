export default `
type Query {
  getFortuneCookie: String @cacheControl(maxAge: 5)
  searchFilms(searchText: String!, language: String): [SearchMovieItem]
  searchSeries(searchText: String!, language: String): [SearchSerieItem]
  getMovie(externalId: Int!, language: String): Movie
  getSerie(externalId: Int!, language: String): Serie @cacheControl(maxAge: 5)
  getUserSeries(userId: String!): [UserSerie]
  getUserMovies(userId: String!): [UserMovie]
  getUserLastItems(userId: String!): [LastItem]
  getUserMovie(userId: String!, id: String!): UserMovie
  getUserSerie(userId: String!, id: String!): UserSerie
}
`;