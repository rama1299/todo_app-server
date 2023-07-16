const { User } = require("../models");
const bcrypt = require("bcrypt");

class userController {
  static async findUserLogged(req, res, next) {
    try {
      const { id } = req.userLogged;
      const data = await User.findOne({
        where: { id },
      });

      if (!data) {
        throw { name: "ErrorNotFound" };
      }

      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async updateUserLogged(req, res, next) {
    try {
      const { id } = req.userLogged;
      const { username, email, password } = req.body;

      if (!username || !email || !password) {
        throw { name: "IncompleteData" };
      }

      const salt = bcrypt.genSaltSync(10);
      const hashPassword = bcrypt.hashSync(password, salt);

      const userUpdate = await User.update(
        {
          username,
          email,
          password: hashPassword,
        },
        {
          where: { id },
        }
      );

      if (!userUpdate) {
        throw { name: "UpdateFailed" };
      }

      res.status(200).json({ message: "Update user success!" });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = userController;
