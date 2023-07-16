const { Note, User } = require("../models");
const { Op } = require("sequelize");

class noteController {
  static async findNotes(req, res, next) {
    try {
      const userId = req.userLogged.id;

      const data = await Note.findAll({
        where: {
          userId,
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

  static async findNoteById(req, res, next) {
    try {
      const userId = req.userLogged.id;
      const { id } = req.params;

      const data = await Note.findOne({
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

  static async createNote(req, res, next) {
    try {
      const userId = req.userLogged.id;
      const { noteName, noteText, color } = req.body;

      if (!noteName || !noteText || !color) {
        throw { name: "IncompleteData" };
      }

      const data = await Note.create({
        userId,
        noteName,
        noteText,
        color,
      });

      if (!data) {
        throw { name: "CreateFailed" };
      }

      res.status(200).json({ message: "Create note successfully!" });
    } catch (err) {
      next(err);
    }
  }

  static async updateNote(req, res, next) {
    try {
      const userId = req.userLogged.id;
      const { id } = req.params;
      const { noteName, noteText, color } = req.body;

      if (!noteName || !noteText || !color) {
        throw { name: "IncompleteData" };
      }

      const data = await Note.update(
        {
          noteName,
          noteText,
          color,
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

      res.status(200).json({ message: "Update note successfully!" });
    } catch (err) {
      next(err);
    }
  }

  static async deleteNote(req, res, next) {
    try {
      const userId = req.userLogged.id;
      const { id } = req.params;

      const data = await Note.destroy({
        where: {
          [Op.and]: [{ userId }, { id }],
        },
      });

      if (!data) {
        throw { name: "ErrorNotFound" };
      }

      res.status(200).json({ message: "Delete note successfully!" });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = noteController;
