import { makeExecutableSchema } from 'graphql-tools';
import resolvers from '../resolvers';
import { Rating, FilmOMDB, SerieOMDB } from './omdb'
import {
    SearchMovieItem,
    SearchSerieItem,
    FilmMDB,
    SerieMDB,
    VideoData,
    Season,
    Genre,
    Images,
} from './movieDataBase';

import queries from './queries';



const schema = makeExecutableSchema({
    typeDefs: [
        queries,
        Rating,
        FilmOMDB,
        SerieOMDB,
        SearchMovieItem,
        SearchSerieItem,
        FilmMDB,
        SerieMDB,
        VideoData,
        Season,
        Genre,
        Images,
    ],
    resolvers
});

// addMockFunctionsToSchema({ schema, mocks });

export default schema;