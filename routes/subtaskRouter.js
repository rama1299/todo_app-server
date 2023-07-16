const express = require("express");
const router = express.Router();
const authentication = require("../middlewares/authentication");

const subtaskController = require("../controllers/subtaskController.js");

router.get("/api/subtasks", authentication, subtaskController.findSubtasks);
router.get(
  "/api/subtasks/:id",
  authentication,
  subtaskController.findSubtaskById
);
router.post(
  "/api/subtasks/:taskId",
  authentication,
  subtaskController.createSubtask
);
router.put(
  "/api/subtasks/:id",
  authentication,
  subtaskController.updateSubtask
);
router.put(
  "/api/subtasks/priority/:id",
  authentication,
  subtaskController.updateSubtaskPriority
);
router.put(
  "/api/subtasks/status/:id",
  authentication,
  subtaskController.updateSubtaskStatus
);
router.delete(
  "/api/subtasks/:id",
  authentication,
  subtaskController.deleteSubtask
);

module.exports = router;
