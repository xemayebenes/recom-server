import Mongoose from 'mongoose';

import { Notification, User } from '../models';

const getNotification = id =>
  Notification.findById(id).populate('from', 'email');

const addNotification = async (
  type,
  title,
  externalId,
  listId,
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
    listId,
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
  return getNotification(notification.id);
};

const getUserNotifications = userId =>
  Notification.find({ user: userId })
    .populate('from', 'email')
    .sort({ date: -1 });

const markNotification = async id => {
  await Notification.update({ _id: id }, { $set: { new: false } });
  return getNotification(id);
};
export default {
  getNotification,
  addNotification,
  getUserNotifications,
  markNotification
};
