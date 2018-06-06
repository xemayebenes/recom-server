export default ({
    connectors,
}) => {
    const resolvers = {
        Query: {
            searchFilms(_, { searchText, language }) {
                return connectors.movieDataBaseService.searchFilm(searchText, language)
            },
            searchSeries(_, { searchText, language }) {
                return connectors.movieDataBaseService.searchSeries(searchText, language)
            },
            getMovie(_, { id, language }) {
                return connectors.movieDataBaseService.fetchMovie(id, language)
            },
            getSerie(_, { id, language }) {
                return connectors.movieDataBaseService.fetchSerie(id, language)
            },
            // getOMDBFilm(_, { id }) {
            //     return connectors.omdbService.fetchOMDBMovie(id)
            // },
            // getOMDBSerie(_, { title }) {
            //     return connectors.omdbService.fetchOMDBSerie(title)
            // },
            getUserSeries(_, { userId }) {
                return connectors.dataBaseService.getSeriesByUser(userId);
            },
            getUserMovies(_, { userId }) {
                return connectors.dataBaseService.getMoviesByUser(userId);
            }
        },
        Movie: {
            videoData(movie) {
                return connectors.movieDataBaseService.fetchVideoData(movie.externalId)
            },
            omdbData(movie) {
                return connectors.omdbService.fetchOMDBMovie(movie.imdb_id)
            }
        },
        Serie: {
            videoData(serie) {
                return connectors.movieDataBaseService.fetchSerieVideoData(serie.externalId)
            },
            omdbData(serie) {
                return connectors.omdbService.fetchOMDBSerie(serie.name)
            }
        },
        UserMovie: {
            film(userMovie) {
                return connectors.movieDataBaseService.fetchMovie(userMovie.externalId);
            }
        },
        UserSerie: {
            serie(userSerie) {
                return connectors.movieDataBaseService.fetchSerie(userSerie.externalId);
            }
        },
        Mutation: {
            addMovie: async(root, { externalId }) => {
                const movie = await connectors.dataBaseService.createMovie(externalId)
                return movie;
            },
            addSerie: async(root, { externalId }) => {
                return await connectors.dataBaseService.createSerie(externalId);
            },
        },
    };
    return resolvers;
}