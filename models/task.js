"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Task.hasMany(models.Subtask, {
        foreignKey: "taskId",
      });

      Task.hasMany(models.TaskComment, {
        foreignKey: "taskId",
      });

      Task.belongsTo(models.User, {
        foreignKey: "userId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });

      Task.belongsTo(models.List, {
        foreignKey: "listId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Task.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
          notNull: true,
          isInt: true,
        },
      },
      listId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
          notNull: true,
          isInt: true,
        },
      },
      taskName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          notNull: true,
        },
      },
      description: {
        type: DataTypes.STRING,
      },
      dueDate: {
        type: DataTypes.DATE,
        validate: {
          isDate: true,
        },
      },
      isPriority: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        validate: {
          notEmpty: true,
          notNull: true,
        },
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "ongoing",
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
      sequelize,
      modelName: "Task",
      timestamps: true,
    }
  );
  return Task;
};
