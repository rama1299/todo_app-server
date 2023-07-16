const express = require("express");
const router = express.Router();
const authentication = require("../middlewares/authentication");

const listController = require("../controllers/listController.js");

router.get("/api/lists", authentication, listController.findLists);
router.get(
  "/api/lists/favorites",
  authentication,
  listController.findListsFavorites
);
router.get("/api/lists/:id", authentication, listController.findListById);
router.post("/api/lists", authentication, listController.createList);
router.put("/api/lists/:id", authentication, listController.updateList);
router.put(
  "/api/lists/favorites/:id",
  authentication,
  listController.updateListFavorite
);
router.delete("/api/lists/:id", authentication, listController.deleteList);

module.exports = router;
