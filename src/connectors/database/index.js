import Mongoose from 'mongoose';

import { User, Notification } from './models';

import listService from './services/lists.service';
import itemsService from './services/items.service';

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
  dataBase.itemsService = itemsService;

  return dataBase;
};
