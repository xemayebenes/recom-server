import { makeExecutableSchema } from 'graphql-tools';
import { Rating, FilmOMDBData, SerieOMDBData } from './omdb';
import {
  SearchMovieItem,
  SearchSerieItem,
  Movie,
  Serie,
  VideoData,
  Season,
  Genre,
  Images,
  ImagesData,
  ItemInterface
} from './movieDataBase';

import { UserMovie, UserSerie, LastItem, Date } from './database';
import { Notification } from './notifications';

import queries from './queries';
import mutations from './mutations';
import subscriptions from './subscriptions';

export default ({ resolvers }) => {
  const schema = makeExecutableSchema({
    typeDefs: [
      queries,
      mutations,
      subscriptions,
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
      ImagesData,
      UserMovie,
      UserSerie,
      LastItem,
      Date,
      ItemInterface,
      Notification
    ],
    resolvers
  });

  return schema;
};
