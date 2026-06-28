const Link = require("../models/Link");
const Collection = require("../models/Collection");
//create link
const createLink = async ({
  title,
  url,
  description,
  tags,
  collectionId,
  userId,
}) => {
  const link = await Link.create({
    title,
    url,
    description,
    tags,
    collectionId,
    userId,
  });

  return link;
};
//get all links for a user
const getLinks = async (userId) => {
  const links = await Link.find({
    userId,
  })
    .populate("collectionId", "name")
    .sort({ createdAt: -1 });

  return links;
};
//get link by collection
const getLinksByCollection = async (
  collectionId,
  userId
) => {
  const links = await Link.find({
    collectionId,
    userId,
  }).sort({ createdAt: -1 });

  return links;
};
//delete link
const deleteLink = async (linkId, userId) => {
  const link = await Link.findOneAndDelete({
    _id: linkId,
    userId,
  });

  return link;
};
//Favourite Toggle
const toggleFavorite = async (linkId, userId) => {
  const link = await Link.findOne({
    _id: linkId,
    userId,
  });

  if (!link) {
    return null;
  }

  link.isFavorite = !link.isFavorite;

  await link.save();

  return link;
};
//Archive Toggle
const toggleArchive = async (linkId, userId) => {
  const link = await Link.findOne({
    _id: linkId,
    userId,
  });

  if (!link) {
    return null;
  }

  link.isArchived = !link.isArchived;

  await link.save();

  return link;
};
//Update Link
const updateLink = async (
  linkId,
  userId,
  updateData
) => {
  const link = await Link.findOneAndUpdate(
    {
      _id: linkId,
      userId,
    },
    updateData,
    {
      new: true,
      runValidators: true,
    }
  );

  return link;
};
//Search Links
const searchLinks = async (
  searchTerm,
  userId
) => {

  const collections =
    await Collection.find({
      userId,
      name: {
        $regex: searchTerm,
        $options: "i",
      },
    });

  const collectionIds =
    collections.map(
      (collection) =>
        collection._id
    );

  const links = await Link.find({
    userId,

    $or: [
      {
        title: {
          $regex: searchTerm,
          $options: "i",
        },
      },

      {
        description: {
          $regex: searchTerm,
          $options: "i",
        },
      },

      {
        url: {
          $regex: searchTerm,
          $options: "i",
        },
      },

      {
        tags: {
          $elemMatch: {
            $regex: searchTerm,
            $options: "i",
          },
        },
      },

      {
        collectionId: {
          $in: collectionIds,
        },
      },
    ],
  })
    .populate(
      "collectionId",
      "name"
    )
    .limit(10);

  return links;
};
// get allfavorite links
const getFavoriteLinks = async (userId) => {
  const links = await Link.find({
    userId,
    isFavorite: true,
  })
    .populate("collectionId", "name")
    .sort({ createdAt: -1 });

  return links;
};

// get all archived links
const getArchivedLinks = async (userId) => {
  const links = await Link.find({
    userId,
    isArchived: true,
  })
    .populate("collectionId", "name")
    .sort({ createdAt: -1 });

  return links;
};
//Get Single Link or Get Link By ID
const getLinkById = async (linkId, userId) => {
  const link = await Link.findOne({
    _id: linkId,
    userId,
  }).populate("collectionId", "name");

  return link;
};

module.exports = {
  createLink,
  getLinks,
  getLinksByCollection,
  deleteLink,
  toggleFavorite,
  toggleArchive,
  updateLink,
  searchLinks,
  getFavoriteLinks,
  getArchivedLinks,
  getLinkById,
};