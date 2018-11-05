import Mongoose from 'mongoose';

import { MOVIE_ITEM, SERIE_ITEM } from '../constants';

import {
  UserSchema,
  options,
  ItemSchema,
  LastItemSchema,
  NotificationSchema,
  ListSchema
} from './schemas';

export const Notification = Mongoose.model('Notification', NotificationSchema);

export const Item = Mongoose.model('Item', ItemSchema);

export const LastItem = Mongoose.model('LastItem', LastItemSchema);

export const User = Mongoose.model('users', UserSchema);

export const Movie = Item.discriminator(
  MOVIE_ITEM,
  new Mongoose.Schema({}, options)
);
export const Serie = Item.discriminator(
  SERIE_ITEM,
  new Mongoose.Schema({}, options)
);

export const List = Mongoose.model('List', ListSchema);
