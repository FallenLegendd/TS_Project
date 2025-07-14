"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate({ User, Post }) {
      this.belongsTo(User, { foreignKey: "user_id" });
      this.belongsTo(Post, { foreignKey: "post_id" });
    }

    static validate(data) {
      if (!data) {
        return {
          isValid: false,
          error: "Данные не переданы",
        };
      }

      const { text } = data;

      if (!text || typeof text !== "string" || text.trim().length === 0) {
        return {
          isValid: false,
          error: "Коммент не должен быть пустым",
        };
      }

      return {
        isValid: true,
        error: null,
      };
    }
  }

  Comment.init(
    {
      text: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
      post_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Comment",
    }
  );
  return Comment;
};
