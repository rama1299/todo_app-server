const express = require("express");
const router = express.Router();
const authentication = require("../middlewares/authentication");

const taskController = require("../controllers/taskController.js");

router.get("/api/tasks", authentication, taskController.findTasks);
router.get("/api/tasks/:id", authentication, taskController.findTaskById);
router.post("/api/tasks/:listId", authentication, taskController.createTask);
router.put("/api/tasks/:id", authentication, taskController.updateTask);
router.put(
  "/api/tasks/priority/:id",
  authentication,
  taskController.updateTaskPriority
);
router.put(
  "/api/tasks/status/:id",
  authentication,
  taskController.updateTaskStatus
);
router.delete("/api/tasks/:id", authentication, taskController.deleteTask);

module.exports = router;
