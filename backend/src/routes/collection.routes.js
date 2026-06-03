const express = require("express");
const protect = require("../middleware/auth.middleware");

const {
  create,
    getAll,
    getOne,
    update,
    remove,
} = require("../controllers/collection.controller");

const router = express.Router();

router.post("/", protect, create);//create collection
router.get("/", protect, getAll);//get all collections for a user
router.get("/:id", protect, getOne);//get single collection by id
router.patch("/:id",protect,update);//update collection
router.delete("/:id", protect, remove);//delete collection and its links means cascade deletion
module.exports = router;