const { Task, TaskComment } = require("../models");
const { Op } = require("sequelize");

class taskCommentController {
  static async createTaskComment(req, res, next) {
    try {
      const userId = req.userLogged.id;
      const taskId = parseInt(req.params.taskId);
      const { commentText } = req.body;

      const checkTaskUser = await Task.findOne({
        where: {
          [Op.and]: [{ userId }, { id: taskId }],
        },
      });

      if (!checkTaskUser) {
        throw { name: "Unautorized" };
      }

      if (!commentText) {
        throw { name: "IncompleteData" };
      }

      const data = await TaskComment.create({
        userId,
        taskId,
        commentText,
      });

      if (!data) {
        throw { name: "CreateFailed" };
      }

      res.status(200).json({ message: "Create taskcomment successfully!" });
    } catch (err) {
      next(err);
    }
  }

  static async deleteTaskComment(req, res, next) {
    try {
      const userId = req.userLogged.id;
      const { id } = req.params;

      const existingData = await TaskComment.findOne({
        where: {
          [Op.and]: [{ userId }, { id }],
        },
      });

      if (!existingData) {
        throw { name: "ErrorNotFound" };
      }

      const data = await TaskComment.destroy({
        where: {
          [Op.and]: [{ userId }, { id }],
        },
      });

      if (!data) {
        throw { name: "DeleteFailed" };
      }

      res.status(200).json({ message: "Delete taskcomment successfully!" });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = taskCommentController;
