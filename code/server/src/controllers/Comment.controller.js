const CommentService = require("../services/Comment.service");
const formatResponse = require("../utils/formatResponse");
const { Comment } = require("../db/models");

class CommentController {
  static async getAll(req, res) {
    try {
      const comments = await CommentService.getAll();

      if (comments.lenght === 0) {
        return res.status(200).json(formatResponse(200, "No Comments", []));
      }

      return res
        .status(200)
        .json(formatResponse(200, "Комменты получены", comments));
    } catch ({ message }) {
      res
        .status(500)
        .json(formatResponse(500, "Комменты не получены", null, message));
    }
  }

  static async getById(req, res) {
    const { id } = req.params;

    if (isNaN(id))
      return res
        .status(400)
        .json(formatResponse(400, "Невалидный id", null, "Невалидный id"));

    try {
      const comment = await CommentService.getById(id);

      if (!comment) {
        return res
          .status(404)
          .json(
            formatResponse(404, "Не найден comment", null, "Не найден comment")
          );
      }

      return res
        .status(200)
        .json(formatResponse(200, `Данные по ${id} успешно получены`, comment));
    } catch ({ message }) {
      res
        .status(500)
        .json(formatResponse(500, "Комменты не получены", null, message));
    }
  }

  static async getAllForPost(req, res) {
    const { postId } = req.params;

    if (isNaN(postId))
      return res
        .status(400)
        .json(
          formatResponse(400, "Невалидный postId", null, "Невалидный postId")
        );

    try {
      const comments = await CommentService.getAllForThisPost(postId);

      if (comments.length === 0) {
        return res
          .status(200)
          .json(formatResponse(200, "Комментарии для поста не найдены", []));
      }

      return res
        .status(200)
        .json(formatResponse(200, "Комментарии для поста получены", comments));
    } catch ({ message }) {
      res
        .status(500)
        .json(
          formatResponse(
            500,
            "Ошибка при получении комментариев для поста",
            null,
            message
          )
        );
    }
  }

  static async getAllForPostByUser(req, res) {
    const { userId, postId } = req.params;

    if (isNaN(userId) || isNaN(postId))
      return res
        .status(400)
        .json(
          formatResponse(
            400,
            "Невалидные userId или postId",
            null,
            "Невалидные userId или postId"
          )
        );

    try {
      const comments = await CommentService.getAllForThisPostWithUsers(
        userId,
        postId
      );

      if (comments.length === 0) {
        return res
          .status(200)
          .json(
            formatResponse(
              200,
              "Комментарии пользователя для поста не найдены",
              []
            )
          );
      }

      return res
        .status(200)
        .json(
          formatResponse(
            200,
            "Комментарии пользователя для поста получены",
            comments
          )
        );
    } catch ({ message }) {
      res
        .status(500)
        .json(
          formatResponse(
            500,
            "Ошибка при получении комментариев пользователя для поста",
            null,
            message
          )
        );
    }
  }

  static async create(req, res) {
    const {user} = res.locals
    console.log(user, 'FORM COMMENT CONTROLLER ======================>>>>>>>>>>');
    const user_id = user.id
    const { text, post_id } = req.body;

    const validation = Comment.validate({ text });
    if (!validation.isValid) {
      return res
        .status(400)
        .json(formatResponse(400, "Ошибка валидации", null, validation.error));
    }

    if (!user_id || !post_id) {
      return res
        .status(400)
        .json(
          formatResponse(
            400,
            "Отсутствуют обязательные поля",
            null,
            "user_id и post_id обязательны"
          )
        );
    }

    try {
      const commentData = {
        text: text.trim(),
        user_id,
        post_id,
      };

      const newComment = await CommentService.createComment(commentData);

      return res
        .status(201)
        .json(formatResponse(201, "Комментарий успешно создан", newComment));
    } catch ({ message }) {
      res
        .status(500)
        .json(
          formatResponse(500, "Ошибка при создании комментария", null, message)
        );
    }
  }

  static async update(req, res) {
    const { id } = req.params;
    const { text } = req.body;

    if (isNaN(id))
      return res
        .status(400)
        .json(formatResponse(400, "Невалидный id", null, "Невалидный id"));

    // Валидация данных
    const validation = Comment.validate({ text });
    if (!validation.isValid) {
      return res
        .status(400)
        .json(formatResponse(400, "Ошибка валидации", null, validation.error));
    }

    try {
      const comment = await CommentService.getById(id);

      if (!comment) {
        return res
          .status(404)
          .json(
            formatResponse(
              404,
              "Комментарий не найден",
              null,
              "Комментарий не найден"
            )
          );
      }

      const updatedComment = await CommentService.updateById(id, { text });

      return res
        .status(200)
        .json(
          formatResponse(200, "Комментарий успешно обновлен", updatedComment)
        );
    } catch ({ message }) {
      res
        .status(500)
        .json(
          formatResponse(
            500,
            "Ошибка при обновлении комментария",
            null,
            message
          )
        );
    }
  }

  static async delete(req, res) {
    const { id } = req.params;

    if (isNaN(id))
      return res
        .status(400)
        .json(formatResponse(400, "Невалидный id", null, "Невалидный id"));

    try {
      const comment = await CommentService.getById(id);

      if (!comment) {
        return res
          .status(404)
          .json(
            formatResponse(
              404,
              "Комментарий не найден",
              null,
              "Комментарий не найден"
            )
          );
      }

      await comment.destroy();

      return res
        .status(200)
        .json(formatResponse(200, "Комментарий успешно удален", null));
    } catch ({ message }) {
      res
        .status(500)
        .json(
          formatResponse(500, "Ошибка при удалении комментария", null, message)
        );
    }
  }
}

module.exports = CommentController;
