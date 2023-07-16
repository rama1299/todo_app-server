const { Task, Subtask, TaskComment, List } = require("../models");
const { Op } = require("sequelize");

class taskController {
  static async findTasks(req, res, next) {
    try {
      const userId = req.userLogged.id;

      const data = await Task.findAll({
        where: {
          userId,
        },
        include: [
          {
            model: Subtask,
          },
          {
            model: TaskComment,
          },
        ],
        order: [
          ["dueDate", "ASC"],
          [Subtask, "dueDate", "ASC"],
          [TaskComment, "createdAt", "ASC"],
        ],
      });

      if (!data) {
        throw { name: "ErrorNotFound" };
      }

      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async findTaskById(req, res, next) {
    try {
      const userId = req.userLogged.id;
      const { id } = req.params;

      const data = await Task.findOne({
        where: {
          [Op.and]: [{ userId }, { id }],
        },
        include: [
          {
            model: Subtask,
          },
          {
            model: TaskComment,
          },
        ],
        order: [
          [Subtask, "dueDate", "ASC"],
          [TaskComment, "createdAt", "ASC"],
        ],
      });

      if (!data) {
        throw { name: "ErrorNotFound" };
      }

      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async createTask(req, res, next) {
    try {
      const userId = req.userLogged.id;
      const listId = parseInt(req.params.listId);
      const { taskName, description, dueDate, isPriority } = req.body;

      const checkListUser = await List.findOne({
        where: {
          [Op.and]: [{ userId }, { id: listId }],
        },
      });

      if (!checkListUser) {
        throw { name: "Unautorized" };
      }

      if (!taskName) {
        throw { name: "IncompleteData" };
      }

      const data = await Task.create({
        userId,
        listId,
        taskName,
        description,
        dueDate,
        isPriority,
      });

      if (!data) {
        throw { name: "CreateFailed" };
      }

      res.status(200).json({ message: "create Task successfully!" });
    } catch (err) {
      next(err);
    }
  }

  static async updateTask(req, res, next) {
    try {
      const userId = req.userLogged.id;
      const { id } = req.params;
      const { taskName, description, dueDate } = req.body;

      const existingData = await Task.findOne({
        where: {
          [Op.and]: [{ userId }, { id }],
        },
      });

      if (!existingData) {
        throw { name: "ErrorNotFound" };
      }

      if (!taskName) {
        throw { name: "IncompleteData" };
      }

      const data = await Task.update(
        {
          taskName,
          description,
          dueDate,
        },
        {
          where: {
            [Op.and]: [{ userId }, { id }],
          },
        }
      );

      if (!data) {
        throw { name: "UpdateFailed" };
      }

      res.status(200).json({ message: "Update task successfully!" });
    } catch (err) {
      next(err);
    }
  }

  static async updateTaskPriority(req, res, next) {
    try {
      const userId = req.userLogged.id;
      const { id } = req.params;
      const { isPriority } = req.body;

      const existingData = await Task.findOne({
        where: {
          [Op.and]: [{ userId }, { id }],
        },
      });

      if (!existingData) {
        throw { name: "ErrorNotFound" };
      }

      if (!isPriority) {
        throw { name: "IncompleteData" };
      }

      const data = await Task.update(
        {
          isPriority,
        },
        {
          where: {
            [Op.and]: [{ userId }, { id }],
          },
        }
      );

      if (!data) {
        throw { name: "UpdateFailed" };
      }

      res.status(200).json({ message: "Update task priority successfully!" });
    } catch (err) {
      next(err);
    }
  }

  static async updateTaskStatus(req, res, next) {
    try {
      const userId = req.userLogged.id;
      const { id } = req.params;
      const { status } = req.body;

      const existingData = await Task.findOne({
        where: {
          [Op.and]: [{ userId }, { id }],
        },
      });

      if (!existingData) {
        throw { name: "ErrorNotFound" };
      }

      if (!status) {
        throw { name: "IncompleteData" };
      }

      const data = await Task.update(
        {
          status,
        },
        {
          where: {
            [Op.and]: [{ userId }, { id }],
          },
        }
      );

      if (!data) {
        throw { name: "UpdateFailed" };
      }

      res.status(200).json({ message: "Update task status successfully!" });
    } catch (err) {
      next(err);
    }
  }

  static async deleteTask(req, res, next) {
    try {
      const userId = req.userLogged.id;
      const { id } = req.params;

      const existingData = await Task.findOne({
        where: {
          [Op.and]: [{ userId }, { id }],
        },
      });

      if (!existingData) {
        throw { name: "ErrorNotFound" };
      }

      const data = await Task.destroy({
        where: {
          [Op.and]: [{ userId }, { id }],
        },
      });

      if (!data) {
        throw { name: "DeleteFailed" };
      }

      res.status(200).json({ message: "Delete Task successfully!" });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = taskController;
