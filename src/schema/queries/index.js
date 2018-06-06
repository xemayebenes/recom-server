export default `
type Query {
  getFortuneCookie: String @cacheControl(maxAge: 5)
  searchFilms(searchText: String!, language: String): [SearchMovieItem]
  searchSeries(searchText: String!, language: String): [SearchSerieItem]
  getMovie(id: Int!, language: String): Movie
  getSerie(id: Int!, language: String): Serie @cacheControl(maxAge: 5)
  getUserSeries(userId: String!): [UserSerie]
  getUserMovies(userId: String!): [UserMovie]
}
`;