import Mongoose from 'mongoose';

import { List, Item } from '../models';

const createList = async (name, userId) => {
  const list = new List({ name, user: userId, date: new Date() });
  return list.save();
};

const getListsByUser = userId =>
  List.find({ user: userId })
    .populate('items')
    .populate('user');

const addItemToList = async (listId, itemId) => {
  const item = await Item.findById(itemId);
  await List.findByIdAndUpdate(
    listId,
    { $push: { items: item } },
    { safe: true, upsert: true }
  );
  return getList(listId);
};

const removeItemFromList = (listId, itemId) => {
  return List.findByIdAndUpdate(listId, { $pull: { items: itemId } });
};

const getList = id =>
  List.findById(id)
    .populate('items')
    .populate('user');

export default {
  createList,
  getListsByUser,
  addItemToList,
  getList,
  removeItemFromList
};
