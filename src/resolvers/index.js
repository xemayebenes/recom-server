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
            getMDBFilm(_, { id, language }) {
                return connectors.movieDataBaseService.fetchMovie(id, language)
            },
            getMDBSerie(_, { id, language }) {
                return connectors.movieDataBaseService.fetchSerie(id, language)
            },
            getOMDBFilm(_, { id }) {
                return connectors.omdbService.fetchOMDBMovie(id)
            },
            getOMDBSerie(_, { title }) {
                return connectors.omdbService.fetchOMDBSerie(title)
            },
            getUserSeries(_, { userId }) {
                return connectors.dataBaseService.getSeriesByUser(userId);
            },
            getUserMovies(_, { userId }) {
                return connectors.dataBaseService.getMoviesByUser(userId);
            }
        },
        FilmMDB: {
            videoData(filmMDB) {
                return connectors.movieDataBaseService.fetchVideoData(filmMDB.externalId)
            },
            omdbData(filmMDB) {
                return connectors.omdbService.fetchOMDBMovie(filmMDB.imdb_id)
            }
        },
        SerieMDB: {
            videoData(serieMDB) {
                return connectors.movieDataBaseService.fetchSerieVideoData(serieMDB.externalId)
            },
            omdbData(serieMDB) {
                return connectors.omdbService.fetchOMDBSerie(serieMDB.name)
            }
        },
        Movie: {
            filmMDB(movie) {
                return connectors.movieDataBaseService.fetchMovie(movie.externalId);
            }
        },
        Serie: {
            serieMDB(serie) {
                return connectors.movieDataBaseService.fetchSerie(serie.externalId);
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