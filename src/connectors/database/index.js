import Mongoose from 'mongoose';

const MOVIE_ITEM = 'Movie';
const SERIE_ITEM = 'Serie';
const Schema = Mongoose.Schema;

// import { Movie, Serie } from './models';

export default ({ dbAddress = 'mongodb://localhost/recom' }) => {
  const dataBase = {};

  const UserSchema = Mongoose.Schema({
    email: String,
    password: String,
    movies: [{ type: Schema.Types.ObjectId, ref: 'Item' }],
    series: [{ type: Schema.Types.ObjectId, ref: 'Item' }]
  });

  const options = { discriminatorKey: 'type' };

  const ItemSchema = Mongoose.Schema(
    {
      externalId: Number,
      completed: Boolean,
      user: { type: Schema.Types.ObjectId, ref: 'User' }
    },
    options
  );

  const Item = Mongoose.model('Item', ItemSchema);

  const LastItemSchema = Mongoose.Schema({
    date: Date,
    type: String,
    completed: Boolean,
    item: { type: Schema.Types.ObjectId, ref: 'Item' },
    user: { type: Schema.Types.ObjectId, ref: 'User' }
  });

  const LastItem = Mongoose.model('LastItem', LastItemSchema);

  const User = Mongoose.model('users', UserSchema);
  const Movie = Item.discriminator('Movie', new Mongoose.Schema({}, options));
  const Serie = Item.discriminator('Serie', new Mongoose.Schema({}, options));

  dataBase.connect = () =>
    Mongoose.connect(
      'mongodb://localhost/recom',
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

  dataBase.removeMovie = async (id, userId) => {
    await Movie.remove({ _id: id });
    await LastItem.remove({ item: id });
  };
  dataBase.removeSerie = async (id, userId) => {
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

  dataBase.getUserByEmail = (email, password) =>
    User.findOne({ email, password });
  return dataBase;
};
