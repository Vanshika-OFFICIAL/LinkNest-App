const {
  createCollection,
  getCollections,
  updateCollection,
  deleteCollection,
  getCollectionById,
} = require("../services/collection.service");

// Create Collection
const create = async (req, res) => {
  try {
    const collection = await createCollection({
      name: req.body.name,
      color: req.body.color,
      icon: req.body.icon,
      parentCollection: req.body.parentCollection || null,
      userId: req.user._id,
    });

    res.status(201).json({
      success: true,
      collection,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Collections
const getAll = async (req, res) => {
  try {
    const collections = await getCollections(req.user._id);

    res.status(200).json({
      success: true,
      collections,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Collection By ID
const getOne = async (req, res) => {
  try {
    const collection = await getCollectionById(
      req.params.id,
      req.user._id
    );

    if (!collection) {
      return res.status(404).json({
        success: false,
        message: "Collection not found",
      });
    }

    res.status(200).json({
      success: true,
      collection,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Collection
const update = async (req, res) => {
  try {
    const collection = await updateCollection(
      req.params.id,
      req.user._id,
      req.body
    );

    if (!collection) {
      return res.status(404).json({
        success: false,
        message: "Collection not found",
      });
    }

    res.status(200).json({
      success: true,
      collection,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Collection
const remove = async (req, res) => {
  try {
    const collection = await deleteCollection(
      req.params.id,
      req.user._id
    );

    if (!collection) {
      return res.status(404).json({
        success: false,
        message: "Collection not found",
      });
    }

    res.status(200).json({
      success: true,
      message:
        "Collection and all related links deleted successfully",
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
  getOne,
  update,
  remove,
};