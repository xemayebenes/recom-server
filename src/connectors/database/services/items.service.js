import { LastItem, Movie, User, Serie } from '../models';

const MOVIE_ITEM = 'Movie';
const SERIE_ITEM = 'Serie';

const createMovie = async (externalId, userId) => {
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

const addMultipleMovies = async (moviesList, userId) => {
  const movies = moviesList.map(
    externalId => new Movie({ externalId, user: userId, completed: false })
  );

  const moviesCollection = await Movie.insertMany(movies);
  await User.findByIdAndUpdate(
    userId,
    { $push: { movies: moviesCollection } },
    { safe: true, upsert: true }
  );
  const lastItems = moviesCollection.map(
    movie =>
      new LastItem({
        date: new Date(),
        type: MOVIE_ITEM,
        item: movie,
        user: userId,
        completed: false
      })
  );

  await LastItem.insertMany(lastItems);
  return moviesCollection;
};

const addMultipleSeries = async (seriesList, userId) => {
  const series = seriesList.map(
    externalId => new Serie({ externalId, user: userId, completed: false })
  );

  const seriesCollection = await Serie.insertMany(series);
  await User.findByIdAndUpdate(
    userId,
    { $push: { series: seriesCollection } },
    { safe: true, upsert: true }
  );
  const lastItems = seriesCollection.map(
    serie =>
      new LastItem({
        date: new Date(),
        type: SERIE_ITEM,
        item: serie,
        user: userId,
        completed: false
      })
  );

  await LastItem.insertMany(lastItems);
  return seriesCollection;
};

const createSerie = async (externalId, userId) => {
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

const removeMovie = async id => {
  await Movie.remove({ _id: id });
  await LastItem.remove({ item: id });
};
const removeSerie = async id => {
  await Serie.remove({ _id: id });
  await LastItem.remove({ item: id });
};

const getLastItemsByUser = userId =>
  LastItem.find({ user: userId, completed: false })
    .populate('item')
    .sort({ date: -1 })
    .limit(10);

const getItemsByUser = (Model, userId) => Model.find({ user: userId });

const getItemById = (Model, id) => Model.findById(id);

const getMovieById = id => getItemById(Movie, id);

const getSerieById = id => getItemById(Serie, id);

const getSeriesByUser = userId => getItemsByUser(Serie, userId);

const getMoviesByUser = userId => getItemsByUser(Movie, userId);

const completeMovie = async id => {
  await Movie.update({ _id: id }, { $set: { completed: true } });
  await LastItem.update({ item: id }, { $set: { completed: true } });
  return getMovieById(id);
};
const completeSerie = async id => {
  await Serie.update({ _id: id }, { $set: { completed: true } });
  await LastItem.update({ item: id }, { $set: { completed: true } });
  return getSerieById(id);
};

export default {
  createMovie,
  createSerie,
  removeMovie,
  removeSerie,
  getMovieById,
  getSerieById,
  getSeriesByUser,
  getMoviesByUser,
  completeMovie,
  completeSerie,
  getLastItemsByUser,
  addMultipleMovies,
  addMultipleSeries
};
