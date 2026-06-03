const Link = require("../models/Link");
const Collection = require("../models/Collection");
//create collection
const createCollection = async ({
  name,
  userId,
  parentCollection,
}) => {
  const collection = await Collection.create({
    name,
    userId,
    parentCollection,
  });

  return collection;
};
//get all collections for a user
const getCollections = async (userId) => {
  const collections = await Collection.find({
    userId,
  }).sort({ createdAt: -1 });

  return collections;
};
//Update collection
const updateCollection = async (
  collectionId,
  userId,
  updateData
) => {
  const collection =
    await Collection.findOneAndUpdate(
      {
        _id: collectionId,
        userId,
      },
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

  return collection;
};
//delete collection and its links means cascade deletion
const deleteCollection = async (
  collectionId,
  userId
) => {

  const collection =
    await Collection.findOneAndDelete({
      _id: collectionId,
      userId,
    });

  if (!collection) {
    return null;
  }

  await Link.deleteMany({
    collectionId,
    userId,
  });

  return collection;
};
//get collection by id
const getCollectionById = async (
  collectionId,
  userId
) => {
  const collection =
    await Collection.findOne({
      _id: collectionId,
      userId,
    });
    if (!collection) {
    return null;
  }

  const totalLinks =
    await Link.countDocuments({
      collectionId,
      userId,
    });

  return { collection, totalLinks };
};
module.exports = {
  createCollection,
  getCollections,
  updateCollection,
  deleteCollection,
  getCollectionById,
};