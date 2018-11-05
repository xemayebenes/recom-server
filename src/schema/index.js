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

import { UserMovie, UserSerie, LastItem, Date, User, List } from './database';
import { Notification } from './notifications';

import queries from './queries';
import mutations from './mutations';
import subscriptions from './subscriptions';

export default ({ resolvers }) => {
  const schema = {
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
      Notification,
      User,
      List
    ],
    resolvers
  };

  return schema;
};
