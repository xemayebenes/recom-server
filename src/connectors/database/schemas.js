import Mongoose from 'mongoose';

const Schema = Mongoose.Schema;

export const UserSchema = Mongoose.Schema({
  email: String,
  password: String,
  movies: [{ type: Schema.Types.ObjectId, ref: 'Item' }],
  series: [{ type: Schema.Types.ObjectId, ref: 'Item' }],
  notifications: [{ type: Schema.Types.ObjectId, ref: 'Notification' }]
});

export const options = { discriminatorKey: 'type' };

export const ItemSchema = Mongoose.Schema(
  {
    externalId: Number,
    completed: Boolean,
    user: { type: Schema.Types.ObjectId, ref: 'User' }
  },
  options
);

export const LastItemSchema = Mongoose.Schema({
  date: Date,
  type: String,
  completed: Boolean,
  item: { type: Schema.Types.ObjectId, ref: 'Item' },
  user: { type: Schema.Types.ObjectId, ref: 'User' }
});

export const NotificationSchema = Mongoose.Schema({
  new: Boolean,
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  text: String
});
