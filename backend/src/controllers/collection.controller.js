const {
  createCollection,
  getCollections,
  updateCollection,
  deleteCollection,
  getCollectionById,
} = require("../services/collection.service");
//create collection
const create = async (req, res) => {
  try {
    const collection = await createCollection({
      name: req.body.name,
      parentCollection: req.body.parentCollection,
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
//get all collections for a user
const getAll = async (req, res) => {
  try {
    const collections = await getCollections(
      req.user._id
    );

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
//Update collection
const update = async (req, res) => {
  try {
    const collection =
      await updateCollection(
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
//delete collection and its links means cascade deletion
const remove = async (req, res) => {
  try {
    const collection =
      await deleteCollection(
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
//get collection by id
const getOne = async (req, res) => {
  try {
    const collection =
      await getCollectionById(
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
      collection: data.collection,
      totalLinks: data.totalLinks,
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
  update,
  remove,
  getOne,
};