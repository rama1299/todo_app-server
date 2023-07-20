"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.List, {
        foreignKey: "userId",
      });

      User.hasMany(models.Task, {
        foreignKey: "userId",
      });

      User.hasMany(models.Subtask, {
        foreignKey: "userId",
      });

      User.hasMany(models.TaskComment, {
        foreignKey: "userId",
      });

      User.hasMany(models.Note, {
        foreignKey: "userId",
      });
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          notNull: true,
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          notNull: true,
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          notNull: true,
        },
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      hooks: {
        beforeCreate: (user, options) => {
          const salt = bcrypt.genSaltSync(10);
          const hashPassword = bcrypt.hashSync(user.password, salt);
          user.password = hashPassword;
        },
      },
      sequelize,
      modelName: "User",
      timestamps: true,
    }
  );
  return User;
};
