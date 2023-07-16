const express = require("express");
const router = express.Router();
const authentication = require("../middlewares/authentication");

const taskCommentController = require("../controllers/taskCommentController.js");

router.post(
  "/api/task-comment/:taskId",
  authentication,
  taskCommentController.createTaskComment
);
router.delete(
  "/api/task-comment/:id",
  authentication,
  taskCommentController.deleteTaskComment
);

module.exports = router;
