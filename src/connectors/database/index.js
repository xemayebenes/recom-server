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
  dataBase.getUserByEmail = email => User.findOne({ email });

  dataBase.listService = listService;
  dataBase.itemsService = itemsService;
  dataBase.notificationsService = notificationsService;

  return dataBase;
};
