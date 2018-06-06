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

import { Movie, Serie } from './database';

import queries from './queries';
import mutations from './mutations';

export default ({
    resolvers
}) => {

    const schema = makeExecutableSchema({
        typeDefs: [
            queries,
            mutations,
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
            Movie,
            Serie,
        ],
        resolvers
    });

    return schema;
}