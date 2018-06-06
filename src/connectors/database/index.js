import Mongoose from 'mongoose';

const MOVIE_ITEM = 'Movie';
const SERIE_ITEM = 'Serie';
const Schema = Mongoose.Schema;

// import { Movie, Serie } from './models';

export default ({
    dbAddress = 'mongodb://localhost/recom',
}) => {

    const dataBase = {};


    const UserSchema = Mongoose.Schema({
        email: String,
        movies: [{ type: Schema.Types.ObjectId, ref: 'Item' }],
        series: [{ type: Schema.Types.ObjectId, ref: 'Item' }],

    });

    const options = { discriminatorKey: 'kind' };

    const ItemSchema = Mongoose.Schema({
        externalId: Number,
        user: { type: Schema.Types.ObjectId, ref: 'User' },
    }, options);

    const Item = Mongoose.model('items', ItemSchema);

    const LastItemsSchema = Mongoose.Schema({
        date: Date,
        kind: String,
        item: { type: Schema.Types.ObjectId, ref: 'Item' },
    });

    const LastItems = Mongoose.model('lastItems', LastItemsSchema);

    const User = Mongoose.model('users', UserSchema);
    const Movie = Item.discriminator('Movie', new Mongoose.Schema({}, options));
    const Serie = Item.discriminator('Serie', new Mongoose.Schema({}, options));


    dataBase.connect = () => {
        Mongoose.connect('mongodb://localhost/recom', {});
    };

    dataBase.createMovie = async(externalId, userId = '5b15b7a9379a6b763911c023') => {
        const movie = new Movie({ externalId, user: userId })
        await movie.save()
            .then(async() => {
                await User.findByIdAndUpdate(userId, { $push: { movies: movie } }, { safe: true, upsert: true });
                const lastItem = new LastItems({
                    date: new Date(),
                    kind: MOVIE_ITEM,
                    item: movie,
                });
                await lastItem.save();
                return;
            });
        return movie;
    };
    dataBase.createSerie = async(externalId, userId = '5b15b7a9379a6b763911c023') => {
        const serie = new Serie({ externalId, user: userId })
        await serie.save()
            .then(async() => {
                await User.findByIdAndUpdate(userId, { $push: { series: serie } }, { safe: true, upsert: true });
                const lastItem = new LastItems({
                    date: new Date(),
                    kind: SERIE_ITEM,
                    item: serie,
                });
                await lastItem.save();
                return;
            });
        return serie;
    };
    const getItemByUser = (Model, userId) => {
        return Model.find({ user: userId });
    }
    dataBase.getSeriesByUser = async(userId) => {
        return await getItemByUser(Serie, userId);
    };
    dataBase.getMoviesByUser = async(userId) => {
        return await getItemByUser(Movie, userId);
    };
    return dataBase
};