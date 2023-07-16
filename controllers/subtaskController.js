const { Subtask, Task } = require("../models");
const { Op } = require("sequelize");

class subtaskController {
  static async findSubtasks(req, res, next) {
    try {
      const userId = req.userLogged.id;

      const data = await Subtask.findAll({
        where: {
          userId,
        },
        order: [["dueDate", "ASC"]],
      });

      if (!data) {
        throw { name: "ErrorNotFound" };
      }

      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async findSubtaskById(req, res, next) {
    try {
      const userId = req.userLogged.id;
      const { id } = req.params;

      const data = await Subtask.findOne({
        where: {
          [Op.and]: [{ userId }, { id }],
        },
      });

      if (!data) {
        throw { name: "ErrorNotFound" };
      }

      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async createSubtask(req, res, next) {
    try {
      const userId = req.userLogged.id;
      const taskId = parseInt(req.params.taskId);
      const { subtaskName, description, dueDate, isPriority } = req.body;

      const checkTaskUser = await Task.findOne({
        where: {
          [Op.and]: [{ userId }, { id: taskId }],
        },
      });

      if (!checkTaskUser) {
        throw { name: "Unautorized" };
      }

      if (!subtaskName) {
        throw { name: "IncompleteData" };
      }

      const data = await Subtask.create({
        userId,
        taskId,
        subtaskName,
        description,
        dueDate,
        isPriority,
      });

      if (!data) {
        throw { name: "CreateFailed" };
      }

      res.status(200).json({ message: "create subtask successfully!" });
    } catch (err) {
      next(err);
    }
  }

  static async updateSubtask(req, res, next) {
    try {
      const userId = req.userLogged.id;
      const { id } = req.params;
      const { subtaskName, description, dueDate } = req.body;

      const existingData = await Subtask.findOne({
        where: {
          [Op.and]: [{ userId }, { id }],
        },
      });

      if (!existingData) {
        throw { name: "ErrorNotFound" };
      }

      if (!subtaskName) {
        throw { name: "IncompleteData" };
      }

      const data = await Subtask.update(
        {
          subtaskName,
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

      res.status(200).json({ message: "Update subtask successfully!" });
    } catch (err) {
      next(err);
    }
  }

  static async updateSubtaskPriority(req, res, next) {
    try {
      const userId = req.userLogged.id;
      const { id } = req.params;
      const { isPriority } = req.body;

      const existingData = await Subtask.findOne({
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

      const data = await Subtask.update(
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

      res
        .status(200)
        .json({ message: "Update subtask priority successfully!" });
    } catch (err) {
      next(err);
    }
  }

  static async updateSubtaskStatus(req, res, next) {
    try {
      const userId = req.userLogged.id;
      const { id } = req.params;
      const { status } = req.body;

      const existingData = await Subtask.findOne({
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

      const data = await Subtask.update(
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

      res.status(200).json({ message: "Update subtask status successfully!" });
    } catch (err) {
      next(err);
    }
  }

  static async deleteSubtask(req, res, next) {
    try {
      const userId = req.userLogged.id;
      const { id } = req.params;

      const existingData = await Subtask.findOne({
        where: {
          [Op.and]: [{ userId }, { id }],
        },
      });

      if (!existingData) {
        throw { name: "ErrorNotFound" };
      }

      const data = await Subtask.destroy({
        where: {
          [Op.and]: [{ userId }, { id }],
        },
      });

      if (!data) {
        throw { name: "DeleteFailed" };
      }

      res.status(200).json({ message: "Delete subtask successfully!" });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = subtaskController;
