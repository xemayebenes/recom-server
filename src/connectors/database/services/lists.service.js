import Mongoose from 'mongoose';

import { List, Item } from '../models';

const findItems = items => {
  return new Promise((resolve, reject) => {
    Item.find(
      {
        _id: {
          $in: items.map(item => Mongoose.Types.ObjectId(item))
        }
      },
      function(err, docs) {
        if (err) {
          return reject(err);
        }
        return resolve(docs);
      }
    );
  });
};

const createList = async (name, description, type, newItems, userId) => {
  let items = [];
  if (newItems) {
    items = await findItems(newItems);
  }
  const list = new List({
    name,
    description,
    user: userId,
    date: new Date(),
    type,
    items
  });
  return list.save();
};

const removeList = async id => {
  await List.remove({ _id: id });
  return id;
};

const getListsByUser = (userId, type) => {
  const filters = { user: userId };
  if (type) {
    filters.type = type;
  }
  return List.find(filters)
    .populate('items')
    .populate('user');
};

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
  removeItemFromList,
  removeList
};
