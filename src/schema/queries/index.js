export default `
type Query {
  getFortuneCookie: String @cacheControl(maxAge: 5)
  searchFilms(searchText: String!, language: String): [SearchMovieItem]
  searchSeries(searchText: String!, language: String): [SearchSerieItem]
  getMDBFilm(id: Int!, language: String): FilmMDB
  getMDBSerie(id: Int!, language: String): SerieMDB @cacheControl(maxAge: 5)
  getOMDBFilm(id: String!): FilmOMDB
  getOMDBSerie(title: String!): SerieOMDB @cacheControl(maxAge: 5)
  getUserSeries(userId: String!): [Serie]
  getUserMovies(userId: String!): [Movie]
}
`;