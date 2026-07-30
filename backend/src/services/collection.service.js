const Link = require("../models/Link");
const Collection = require("../models/Collection");

// Create Collection
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

// Get All Collections for a User
const getCollections = async (userId) => {
  const collections = await Collection.find({
    userId,
  }).sort({ createdAt: -1 });

  const collectionsWithCount = await Promise.all(
    collections.map(async (collection) => {
      const linksCount = await Link.countDocuments({
        collectionId: collection._id,
        userId,
      });

      return {
        ...collection.toObject(),
        linksCount,
      };
    })
  );

  return collectionsWithCount;
};

// Update Collection
const updateCollection = async (
  collectionId,
  userId,
  updateData
) => {
  const collection = await Collection.findOneAndUpdate(
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

// Delete Collection and all related Links
const deleteCollection = async (
  collectionId,
  userId
) => {
  const collection = await Collection.findOneAndDelete({
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

// Get Collection by ID
const getCollectionById = async (
  collectionId,
  userId
) => {
  const collection = await Collection.findOne({
    _id: collectionId,
    userId,
  });

  if (!collection) {
    return null;
  }

  const linksCount = await Link.countDocuments({
    collectionId,
    userId,
  });

  return {
    ...collection.toObject(),
    linksCount,
  };
};

module.exports = {
  createCollection,
  getCollections,
  updateCollection,
  deleteCollection,
  getCollectionById,
};