import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';
import jwt from 'jsonwebtoken';
import { PubSub } from 'graphql-subscriptions';

export default ({ connectors }) => {
  const pubsub = new PubSub();

  const checkCredentials = (user, userRequired) => {
    if (userRequired !== user) {
      throw new Error('not authorized');
    }
  };

  const resolvers = {
    Query: {
      notifications: (_, args, context) => {
        return connectors.dataBaseService.getUserNotifications(context.userId);
      },
      searchFilms(_, { searchText, language }) {
        return connectors.movieDataBaseService.searchFilm(searchText, language);
      },
      searchSeries(_, { searchText, language }) {
        return connectors.movieDataBaseService.searchSeries(
          searchText,
          language
        );
      },
      getMovie(_, { externalId, language }) {
        return connectors.movieDataBaseService.fetchMovie(externalId, language);
      },
      getSerie(_, { externalId, language }) {
        return connectors.movieDataBaseService.fetchSerie(externalId, language);
      },
      getUserSeries(_, { userId }, context) {
        checkCredentials(context.userId, userId);
        return connectors.dataBaseService.getSeriesByUser(userId);
      },
      getUserMovies(_, { userId }, context) {
        checkCredentials(context.userId, userId);
        return connectors.dataBaseService.getMoviesByUser(userId);
      },
      getUserLastItems(_, { userId }, context) {
        checkCredentials(context.userId, userId);
        return connectors.dataBaseService.getLastItemsByUser(userId);
      },
      getUserMovie(_, { userId, id }, context) {
        checkCredentials(context.userId, userId);
        return connectors.dataBaseService.getMovieById(id);
      },
      getUserSerie(_, { userId, id }, context) {
        checkCredentials(context.userId, userId);
        return connectors.dataBaseService.getSerieById(id);
      }
    },
    Movie: {
      videoData(movie) {
        return connectors.movieDataBaseService.fetchVideoData(movie.externalId);
      },
      omdbData(movie) {
        return connectors.omdbService.fetchOMDBMovie(movie.imdb_id);
      }
    },
    Serie: {
      videoData(serie) {
        return connectors.movieDataBaseService.fetchSerieVideoData(
          serie.externalId
        );
      },
      omdbData(serie) {
        return connectors.omdbService.fetchOMDBSerie(serie.name);
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
      __resolveType(data) {
        if (data.type === 'Serie') {
          return 'Serie';
        } else {
          return 'Movie';
        }
      }
    },
    LastItem: {
      async item(lastItem) {
        let item;
        if (lastItem.item.type === 'Serie') {
          item = await connectors.movieDataBaseService.fetchSerie(
            lastItem.item.externalId
          );
        } else {
          item = await connectors.movieDataBaseService.fetchMovie(
            lastItem.item.externalId
          );
        }
        return {
          id: lastItem.item.id,
          ...item
        };
      }
    },
    Subscription: {
      newNotification: {
        subscribe: (rootValue, { userId }) => {
          return pubsub.asyncIterator(userId);
        }
      }
    },
    Mutation: {
      pushNotification: async (
        root,
        { type, title, externalId, userEmail },
        context
      ) => {
        const user = await connectors.dataBaseService.getUserByEmail(userEmail);

        const newNotification = await connectors.dataBaseService.addNotification(
          type,
          title,
          externalId,
          user.id,
          context.userId
        );

        pubsub.publish(user.id, { newNotification });
        return newNotification;
      },
      markNotification: async (root, { id }) => {
        const newNotification = await connectors.dataBaseService.markNotification(
          id
        );

        return newNotification;
      },
      addMovie: (root, { externalId }, context) => {
        return connectors.dataBaseService.createMovie(
          externalId,
          context.userId
        );
      },
      addSerie: (root, { externalId }, context) => {
        return connectors.dataBaseService.createSerie(
          externalId,
          context.userId
        );
      },
      removeMovie: async (root, { id }, context) => {
        await connectors.dataBaseService.removeMovie(id, context.userId);
        return id;
      },
      removeSerie: async (root, { id }, context) => {
        await connectors.dataBaseService.removeSerie(id, context.userId);
        return id;
      },
      completeMovie: (root, { id }, context) => {
        return connectors.dataBaseService.completeMovie(id, context.userId);
      },
      completeSerie: (root, { id }, context) => {
        return connectors.dataBaseService.completeSerie(id, context.userId);
      }
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
      }
    })
  };
  return resolvers;
};
