import Mongoose from 'mongoose';

import { User } from './models';

import listService from './services/lists.service';
import itemsService from './services/items.service';
import notificationsService from './services/notifications.service';

export default ({
  dbAddress = 'mongodb://recom:recom123@ds139251.mlab.com:39251/recom'
}) => {
  const dataBase = {};

  dataBase.connect = () =>
    Mongoose.connect(
      'mongodb://recom:recom123@ds139251.mlab.com:39251/recom',
      {}
    );

  dataBase.getUserByEmailPassword = (email, password) =>
    User.findOne({ email, password });

  dataBase.createUser = (email, password, user) => {
    const newUser = new User({ email, password, user });
    return newUser.save();
  };

  dataBase.getUserByEmail = email => User.findOne({ email });
  dataBase.getUserByUser = user => User.findOne({ user });

  dataBase.listService = listService;
  dataBase.itemsService = itemsService;
  dataBase.notificationsService = notificationsService;

  return dataBase;
};
