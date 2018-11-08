import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';
import { PubSub } from 'graphql-subscriptions';
import { ForbiddenError, ApolloError } from 'apollo-server-express';

export default ({ dataBaseService }) => {
  const pubsub = new PubSub();

  const checkCredentials = (user, userRequired) => {
    if (userRequired !== user) {
      throw new ForbiddenError();
    }
  };

  const fetchItemInterface = (item, fetcher) => {
    return Promise.resolve()
      .then(() => {
        if (item.type === 'Serie') {
          return fetcher.getSerie(item.externalId);
        } else {
          return fetcher.getMovie(item.externalId);
        }
      })
      .then(itemResolved => ({ ...itemResolved, id: item.id }));
  };

  const resolvers = {
    Query: {
      notifications: (_, args, context) => {
        return dataBaseService.notificationsService.getUserNotifications(
          context.userId
        );
      },
      searchFilms(_, { searchText, language }, { dataSources }) {
        return dataSources.MovieDataBaseAPI.searchFilm(searchText, language);
      },
      searchSeries(_, { searchText, language }, { dataSources }) {
        return dataSources.MovieDataBaseAPI.searchSerie(searchText, language);
      },
      getMovie(_, { externalId, language }, { dataSources }) {
        return dataSources.MovieDataBaseAPI.getMovie(externalId, language);
      },
      getSerie(_, { externalId, language }, { dataSources }) {
        return dataSources.MovieDataBaseAPI.getSerie(externalId, language);
      },
      getUserSeries(_, { userId }, context) {
        checkCredentials(context.userId, userId);
        return dataBaseService.itemsService.getSeriesByUser(userId);
      },
      getUserMovies(_, { userId }, context) {
        checkCredentials(context.userId, userId);
        return dataBaseService.itemsService.getMoviesByUser(userId);
      },
      getUserLastItems(_, { userId }, context) {
        checkCredentials(context.userId, userId);
        return dataBaseService.itemsService.getLastItemsByUser(userId);
      },
      getUserMovie(_, { userId, id }, context) {
        checkCredentials(context.userId, userId);
        return dataBaseService.itemsService.getMovieById(id);
      },
      getUserSerie(_, { userId, id }, context) {
        checkCredentials(context.userId, userId);
        return dataBaseService.itemsService.getSerieById(id);
      },
      lists(_, { userId, type }, context) {
        checkCredentials(context.userId, userId);
        return dataBaseService.listService.getListsByUser(userId, type);
      },
      list(_, { id, userId }, context) {
        checkCredentials(context.userId, userId);
        return dataBaseService.listService.getList(id);
      }
    },
    Movie: {
      videoData(movie, args, { dataSources }) {
        return dataSources.MovieDataBaseAPI.getVideoData(movie.externalId);
      },
      omdbData(movie, args, { dataSources }) {
        return dataSources.OmdbAPI.getMovie(movie.imdb_id);
      }
    },
    Serie: {
      videoData(serie, args, { dataSources }) {
        return dataSources.MovieDataBaseAPI.getSerieVideoData(serie.externalId);
      },
      omdbData(serie, args, { dataSources }) {
        return dataSources.OmdbAPI.getSerie(serie.name);
      }
    },
    UserMovie: {
      film(userMovie, args, { dataSources }) {
        return dataSources.MovieDataBaseAPI.getMovie(userMovie.externalId);
      }
    },
    UserSerie: {
      serie(userSerie, args, { dataSources }) {
        return dataSources.MovieDataBaseAPI.getSerie(userSerie.externalId);
      }
    },
    ItemInterface: {
      __resolveType(data) {
        if (data.type === 'List') {
          return 'List';
        }
        if (data.type === 'Serie') {
          return 'Serie';
        } else {
          return 'Movie';
        }
      }
    },
    LastItem: {
      async item(lastItem, args, { dataSources }) {
        return fetchItemInterface(lastItem.item, dataSources.MovieDataBaseAPI);
      }
    },
    List: {
      async items(list, args, { dataSources }) {
        return Promise.all(
          list.items.map(item =>
            fetchItemInterface(item, dataSources.MovieDataBaseAPI)
          )
        );
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
        { type, title, externalId, userEmail, listId },
        context
      ) => {
        const user = await dataBaseService.getUserByEmail(userEmail);

        const newNotification = await dataBaseService.notificationsService.addNotification(
          type,
          title,
          externalId,
          listId,
          user.id,
          context.userId
        );

        pubsub.publish(user.id, { newNotification });
        return newNotification;
      },
      markNotification: async (root, { id }) => {
        const newNotification = await dataBaseService.notificationsService.markNotification(
          id
        );

        return newNotification;
      },
      addMovie: (root, { externalId }, context) => {
        return dataBaseService.itemsService.createMovie(
          externalId,
          context.userId
        );
      },
      addSerie: (root, { externalId }, context) => {
        return dataBaseService.itemsService.createSerie(
          externalId,
          context.userId
        );
      },
      removeMovie: async (root, { id }, context) => {
        await dataBaseService.itemsService.removeMovie(id, context.userId);
        return id;
      },
      removeSerie: async (root, { id }, context) => {
        await dataBaseService.itemsService.removeSerie(id, context.userId);
        return id;
      },
      completeMovie: (root, { id }, context) => {
        return dataBaseService.itemsService.completeMovie(id, context.userId);
      },
      completeSerie: (root, { id }, context) => {
        return dataBaseService.itemsService.completeSerie(id, context.userId);
      },
      createList: (root, { name, description, type, items }, context) => {
        return dataBaseService.listService.createList(
          name,
          description,
          type,
          items,
          context.userId
        );
      },
      importList: (root, { listId, userId }) => {
        return dataBaseService.listService.importList(listId, userId);
      },
      removeList: (root, { listId }) => {
        return dataBaseService.listService.removeList(listId);
      },
      addItemToList: (root, { listId, itemId }) => {
        return dataBaseService.listService.addItemToList(listId, itemId);
      },
      removeItemFromList: (root, { listId, itemId }) => {
        return dataBaseService.listService.removeItemFromList(listId, itemId);
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
