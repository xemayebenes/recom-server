import { makeExecutableSchema } from 'graphql-tools';
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

export default ({
    resolvers
}) => {

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

    return schema;
}