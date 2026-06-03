const Link = require("../models/Link");
const Collection = require("../models/Collection");

const getStats = async (userId) => {
  const totalLinks = await Link.countDocuments({
    userId,
  });

  const favoriteLinks =
    await Link.countDocuments({
      userId,
      isFavorite: true,
    });

  const archivedLinks =
    await Link.countDocuments({
      userId,
      isArchived: true,
    });

  const collections =
    await Collection.countDocuments({
      userId,
    });

  return {
    totalLinks,
    favoriteLinks,
    archivedLinks,
    collections,
  };
};

module.exports = {
  getStats,
};