import { makeExecutableSchema } from 'graphql-tools';
import { Rating, FilmOMDBData, SerieOMDBData } from './omdb'
import {
    SearchMovieItem,
    SearchSerieItem,
    Movie,
    Serie,
    VideoData,
    Season,
    Genre,
    Images,
    ItemInterface,
} from './movieDataBase';

import { UserMovie, UserSerie, LastItem, Date } from './database';

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
            FilmOMDBData,
            SerieOMDBData,
            SearchMovieItem,
            SearchSerieItem,
            Movie,
            Serie,
            VideoData,
            Season,
            Genre,
            Images,
            UserMovie,
            UserSerie,
            LastItem,
            Date,
            ItemInterface,
        ],
        resolvers
    });

    return schema;
}