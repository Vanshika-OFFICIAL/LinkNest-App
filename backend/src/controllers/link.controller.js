const { 
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
  getLinkById
} = require("../services/link.service");

//create link
const create = async (req, res) => {
  try {
    const link = await createLink({
      title: req.body.title,
      url: req.body.url,
      description: req.body.description,
      tags: req.body.tags,
      collectionId: req.body.collectionId,
      userId: req.user._id,
    });

    res.status(201).json({
      success: true,
      link,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
//get all links for a user
const getAll = async (req, res) => {
  try {
    const links = await getLinks(req.user._id);

    res.status(200).json({
      success: true,
      links,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
//get link by collection
const getByCollection = async (req, res) => {
  try {
    const links = await getLinksByCollection(
      req.params.collectionId,
      req.user._id
    );

    res.status(200).json({
      success: true,
      links,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
//delete link
const remove = async (req, res) => {
  try {
    const link = await deleteLink(
      req.params.id,
      req.user._id
    );

    if (!link) {
      return res.status(404).json({
        success: false,
        message: "Link not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Link deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
//favourite toggle
const favorite = async (req, res) => {
  try {
    const link = await toggleFavorite(
      req.params.id,
      req.user._id
    );

    if (!link) {
      return res.status(404).json({
        success: false,
        message: "Link not found",
      });
    }

    res.status(200).json({
      success: true,
      link,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
//archive toggle
const archive = async (req, res) => {
  try {
    const link = await toggleArchive(
      req.params.id,
      req.user._id
    );

    if (!link) {
      return res.status(404).json({
        success: false,
        message: "Link not found",
      });
    }

    res.status(200).json({
      success: true,
      link,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
//Update Link
const update = async (req, res) => {
  try {
    const link = await updateLink(
      req.params.id,
      req.user._id,
      req.body
    );

    if (!link) {
      return res.status(404).json({
        success: false,
        message: "Link not found",
      });
    }

    res.status(200).json({
      success: true,
      link,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
//Search Links
const search = async (req, res) => {
  try {
    const links = await searchLinks(
      req.query.q,
      req.user._id
    );

    res.status(200).json({
      success: true,
      links,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// get all favorite links
const getFavorites = async (req, res) => {
  try {
    const links = await getFavoriteLinks(
      req.user._id
    );

    res.status(200).json({
      success: true,
      links,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// get all archived links
const getArchived = async (req, res) => {
  try {
    const links = await getArchivedLinks(
      req.user._id
    );

    res.status(200).json({
      success: true,
      links,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
//Get Single Link or Get Link By ID
const getOne = async (req, res) => {
  try {
    const link = await getLinkById(
      req.params.id,
      req.user._id
    );

    if (!link) {
      return res.status(404).json({
        success: false,
        message: "Link not found",
      });
    }

    res.status(200).json({
      success: true,
      link,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = {
  create,
  getAll,
  getByCollection,
  remove,
  update,
  favorite,
  archive,
  search,
  getFavorites,
  getArchived,
  getOne,
};