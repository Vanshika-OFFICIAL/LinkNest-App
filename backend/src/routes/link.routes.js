const express = require("express");

const protect = require("../middleware/auth.middleware");

const { 
    create,
    getAll,
    getByCollection,
    getOne,
    remove,
    favorite,
    archive,
    update,
    search,
    getFavorites,
    getArchived,
} = require("../controllers/link.controller");

const router = express.Router();

router.post("/", protect, create);//create link
router.get("/favorites",protect,getFavorites);//get all favorite links for a user
router.get("/archived",protect,getArchived);//get all Archived links for a user
router.get("/search", protect,search);//search links
router.get("/", protect, getAll);//get all links for a user
router.get("/collection/:collectionId",protect,getByCollection);//get links by collection
router.get("/:id", protect, getOne);//get single link by id
router.delete("/:id", protect, remove);//delete link
router.patch("/:id/favorite",protect,favorite);//favorite Linktoggle
router.patch("/:id/archive",protect,archive);//archive Linktoggle
router.patch("/:id", protect, update);//update link
module.exports = router;