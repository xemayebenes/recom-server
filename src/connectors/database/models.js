import Mongoose from 'mongoose';

import {
  UserSchema,
  options,
  ItemSchema,
  LastItemSchema,
  NotificationSchema
} from './schemas';

export const Notification = Mongoose.model('Notification', NotificationSchema);

export const Item = Mongoose.model('Item', ItemSchema);

export const LastItem = Mongoose.model('LastItem', LastItemSchema);

export const User = Mongoose.model('users', UserSchema);

export const Movie = Item.discriminator(
  'Movie',
  new Mongoose.Schema({}, options)
);
export const Serie = Item.discriminator(
  'Serie',
  new Mongoose.Schema({}, options)
);
