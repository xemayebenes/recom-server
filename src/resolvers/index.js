import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language'

export default ({
    connectors,
}) => {

    const checkCredentials = (user, userRequired) => {
        if (userRequired !== user) {
            throw new Error('not authorized');
        }
    };

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
            getUserSeries(_, { userId }, context) {
                checkCredentials(context.user, userId);
                return connectors.dataBaseService.getSeriesByUser(userId);
            },
            getUserMovies(_, { userId }, context) {
                checkCredentials(context.user, userId);
                return connectors.dataBaseService.getMoviesByUser(userId);
            },
            getUserLastItems(_, { userId }, context) {
                checkCredentials(context.user, userId);
                return connectors.dataBaseService.getLastItemsByUser(userId);
            },
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
        ItemInterface: {
            __resolveType(data, context) {
                if (data.kind === 'Serie') {
                    return 'Serie';
                } else {
                    return 'Movie';
                }
            },
        },
        LastItem: {
            item(lastItem) {
                if (lastItem.item.kind === 'Serie') {
                    return connectors.movieDataBaseService.fetchSerie(lastItem.item.externalId);

                } else {
                    return connectors.movieDataBaseService.fetchMovie(lastItem.item.externalId);
                }
            },
        },
        Mutation: {
            addMovie: (root, { externalId }, context) => {
                return connectors.dataBaseService.createMovie(externalId, context.user);
            },
            addSerie: (root, { externalId }, context) => {
                return connectors.dataBaseService.createSerie(externalId, context.user);
            },
        },
        Date: new GraphQLScalarType({
            name: 'Date',
            description: 'Date custom scalar type',
            parseValue(value) {
                return new Date(value); // value from the client
            },
            serialize(value) {
                return value.getTime(); // value sent to the client
            },
            parseLiteral(ast) {
                if (ast.kind === Kind.INT) {
                    return parseInt(ast.value, 10); // ast value is always in string format
                }
                return null;
            },
        }),
    };
    return resolvers;
}