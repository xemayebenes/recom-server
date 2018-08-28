import Mongoose from 'mongoose';

import {
  User,
  Item,
  LastItem,
  Notification,
  Movie,
  Serie,
  List
} from './models';

import listService from './services/lists.service';

const MOVIE_ITEM = 'Movie';
const SERIE_ITEM = 'Serie';

export default ({
  dbAddress = 'mongodb://recom:recom123@ds139251.mlab.com:39251/recom'
}) => {
  const dataBase = {};

  dataBase.connect = () =>
    Mongoose.connect(
      'mongodb://recom:recom123@ds139251.mlab.com:39251/recom',
      {}
    );

  dataBase.createMovie = async (externalId, userId) => {
    const movie = new Movie({ externalId, user: userId, completed: false });
    await movie.save().then(async () => {
      await User.findByIdAndUpdate(
        userId,
        { $push: { movies: movie } },
        { safe: true, upsert: true }
      );
      const lastItem = new LastItem({
        date: new Date(),
        type: MOVIE_ITEM,
        item: movie,
        user: userId,
        completed: false
      });
      await lastItem.save();
      return;
    });
    return movie;
  };

  dataBase.createSerie = async (externalId, userId) => {
    const serie = new Serie({ externalId, user: userId, completed: false });
    await serie.save().then(async () => {
      await User.findByIdAndUpdate(
        userId,
        { $push: { series: serie } },
        { safe: true, upsert: true }
      );
      const lastItem = new LastItem({
        date: new Date(),
        type: SERIE_ITEM,
        item: serie,
        user: userId,
        completed: false
      });
      await lastItem.save();
      return;
    });
    return serie;
  };

  dataBase.removeMovie = async id => {
    await Movie.remove({ _id: id });
    await LastItem.remove({ item: id });
  };
  dataBase.removeSerie = async id => {
    await Serie.remove({ _id: id });
    await LastItem.remove({ item: id });
  };

  dataBase.completeMovie = async id => {
    await Movie.update({ _id: id }, { $set: { completed: true } });
    await LastItem.update({ item: id }, { $set: { completed: true } });
    return dataBase.getMovieById(id);
  };
  dataBase.completeSerie = async id => {
    await Serie.update({ _id: id }, { $set: { completed: true } });
    await LastItem.update({ item: id }, { $set: { completed: true } });
    return dataBase.getSerieById(id);
  };

  const getItemsByUser = (Model, userId) => Model.find({ user: userId });

  const getItemById = (Model, id) => Model.findById(id);

  dataBase.getMovieById = id => getItemById(Movie, id);

  dataBase.getSerieById = id => getItemById(Serie, id);

  dataBase.getSeriesByUser = userId => getItemsByUser(Serie, userId);

  dataBase.getMoviesByUser = userId => getItemsByUser(Movie, userId);

  dataBase.getLastItemsByUser = userId =>
    LastItem.find({ user: userId, completed: false })
      .populate('item')
      .sort({ date: -1 })
      .limit(10);

  dataBase.getUserByEmailPassword = (email, password) =>
    User.findOne({ email, password });
  dataBase.getUserByEmail = email => User.findOne({ email });

  /***
    NOTIFICATIONS
  ****/

  dataBase.addNotification = async (
    type,
    title,
    externalId,
    userId,
    userFromId
  ) => {
    const notification = new Notification({
      user: userId,
      new: true,
      date: new Date(),
      type,
      title,
      externalId,
      from: userFromId
    });
    await notification.save().then(async () => {
      await User.findByIdAndUpdate(
        userId,
        { $push: { notifications: notification } },
        { safe: true, upsert: true }
      );

      return notification.populate('from', 'email');
    });
    return dataBase.getNotification(notification.id);
  };

  dataBase.getNotification = id =>
    Notification.findById(id).populate('from', 'email');

  dataBase.getUserNotifications = userId =>
    Notification.find({ user: userId })
      .populate('from', 'email')
      .sort({ date: -1 });

  dataBase.markNotification = async id => {
    await Notification.update({ _id: id }, { $set: { new: false } });
    return dataBase.getNotification(id);
  };

  /**
    LISTS
  **/
  dataBase.listService = listService;

  return dataBase;
};
