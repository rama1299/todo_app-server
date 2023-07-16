require("dotenv").config();
const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class authController {
  static async register(req, res, next) {
    try {
      const { username, email, password } = req.body;

      if (!username || !email || !password) {
        throw { name: "IncompleteData" };
      }

      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        throw { name: "EmailAlreadyExists" };
      }

      const salt = bcrypt.genSaltSync(10);
      const hashPassword = bcrypt.hashSync(password, salt);

      const user = await User.create({
        username,
        email,
        password: hashPassword,
      });

      if (!user) {
        throw { name: "RegisterFailed" };
      }

      res
        .status(201)
        .json({ ...user.dataValues, message: "Successfully register!" });
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw { name: "IncompleteData" };
      }

      const findUser = await User.findOne({
        where: { email },
      });

      if (!findUser) {
        throw { name: "IncorrectEmailOrPassword" };
      }

      const comparePassword = await bcrypt.compare(password, findUser.password);

      if (!comparePassword) {
        throw { name: "IncorrectEmailOrPassword" };
      }

      const token = jwt.sign(
        {
          id: findUser.id,
          username: findUser.username,
          email: findUser.email,
        },
        process.env.JWT_SECRET,
        { expiresIn: "12h" }
      );

      res.status(200).json({
        token,
        username: findUser.username,
        id: findUser.id,
      });
    } catch (err) {
      next(err);
    }
  }

  static async forgotPassword(req, res, next) {
    try {
      const { email, newPassword } = req.body;

      if (!email || !newPassword) {
        throw { name: "IncompleteData" };
      }

      const findUser = await User.findOne({
        where: { email },
      });
      if (!findUser) {
        throw { name: "EmailNotFound" };
      }

      const salt = bcrypt.genSaltSync(10);
      const hashNewPassword = bcrypt.hashSync(newPassword, salt);

      const userUpdate = await User.update(
        {
          password: hashNewPassword,
        },
        {
          where: { email },
        }
      );

      if (!userUpdate) {
        throw { name: "PasswordUpdateFailed" };
      }

      res.status(200).json({ message: "Update password success!" });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = authController;
