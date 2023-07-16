const { List, Task, Subtask, TaskComment } = require("../models");
const { Op } = require("sequelize");

class listController {
  static async findLists(req, res, next) {
    try {
      const userId = req.userLogged.id;

      const data = await List.findAll({
        where: {
          userId,
        },
        include: [
          {
            model: Task,
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
          },
        ],
        order: [
          ["createdAt", "ASC"],
          [{ model: Task }, "dueDate", "ASC"],
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

  static async findListById(req, res, next) {
    try {
      const userId = req.userLogged.id;
      const { id } = req.params;

      const data = await List.findOne({
        where: {
          [Op.and]: [{ userId: userId }, { id: listId }],
        },
        include: [
          {
            model: Task,
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
          },
        ],
        order: [
          ["createdAt", "ASC"],
          [{ model: Task }, "dueDate", "ASC"],
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

  static async createList(req, res, next) {
    try {
      const userId = req.userLogged.id;
      const { listName, color, isFavorites } = req.body;

      if (!listName || !color) {
        throw { name: "IncompleteData" };
      }

      const data = await List.create({
        userId,
        listName,
        color,
        isFavorites,
      });

      if (!data) {
        throw { name: "CreateFailed" };
      }

      res.status(200).json({ message: "create list successfully!" });
    } catch (err) {
      next(err);
    }
  }

  static async updateList(req, res, next) {
    try {
      const userId = req.userLogged.id;
      const { id } = req.params;
      const { listName, color } = req.body;

      if (!listName || !color) {
        throw { name: "IncompleteData" };
      }

      const existingData = await List.findOne({
        where: {
          [Op.and]: [{ userId }, { id }],
        },
      });

      if (!existingData) {
        throw { name: "ErrorNotFound" };
      }

      const data = await List.update(
        {
          listName,
          color,
        },
        {
          where: {
            [Op.and]: [{ userId }, { id }],
          },
        }
      );

      res.status(200).json({ message: "update list successfully!" });
    } catch (err) {
      next(err);
    }
  }

  static async updateListFavorite(req, res, next) {
    try {
      const userId = req.userLogged.id;
      const { id } = req.params;
      const { isFavorites } = req.body;

      if (!isFavorites) {
        throw { name: "IncompleteData" };
      }

      const existingData = await List.findOne({
        where: {
          [Op.and]: [{ userId }, { id }],
        },
      });

      if (!existingData) {
        throw { name: "ErrorNotFound" };
      }

      const data = await List.update(
        {
          isFavorites,
        },
        {
          where: {
            [Op.and]: [{ userId }, { id }],
          },
        }
      );

      res.status(200).json({
        message: "update list favorite successfully!",
      });
    } catch (err) {
      next(err);
    }
  }

  static async findListsFavorites(req, res, next) {
    try {
      const userId = req.userLogged.id;
      const isFavorites = true;

      const data = await List.findAll({
        where: {
          userId,
          isFavorites,
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

  static async deleteList(req, res, next) {
    try {
      const userId = req.userLogged.id;
      const { id } = req.params;

      const existingData = await List.findOne({
        where: {
          [Op.and]: [{ userId }, { id }],
        },
      });

      if (!existingData) {
        throw { name: "ErrorNotFound" };
      }

      const data = await List.destroy({
        where: {
          [Op.and]: [{ userId }, { id }],
        },
      });

      if (!data) {
        throw { name: "DeleteFailed" };
      }

      res.status(200).json({ message: "Delete list successfully!" });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = listController;
