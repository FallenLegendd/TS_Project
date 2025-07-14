const PostService = require("../services/Post.service");
const formatResponse = require("../utils/formatResponse");
const { Post } = require("../db/models");

class PostController {
  static async getAll(req, res) {
    try {
      const tasks = await PostService.getAll();

      if (tasks.length === 0) {
        return res.status(200).json(formatResponse(200, "Данных нет", []));
      }

      return res
        .status(200)
        .json(formatResponse(200, "Данных успешно получены", tasks));
    } catch ({ message }) {
      console.log("=============PostController.getAll=============", message);
      res
        .status(500)
        .json(formatResponse(500, "Внутренняя ошибка сервера", null, message));
    }
  }

  static async getAllSorted(req, res) {
    try {
      const data = await PostService.getAllSorted();
      console.log(data);
      

      res.status(200).json(formatResponse(200, "Getted data", data, ' '))
    } catch ({message}) {
      console.log("=============PostController.getAll=============", message);
      res.status(500).json(formatResponse(500, "Внутренняя ошибка сервера", null, message));
    }
  }

  static async getById(req, res) {
    const { id } = req.params;

    if (isNaN(id))
      return res
        .status(400)
        .json(
          formatResponse(
            400,
            "Невалидный id",
            null,
            "Невалидный id"
          )
        );

    try {
      const task = await PostService.getById(id);

      if (!task) {
        return res
          .status(404)
          .json(
            formatResponse(404, "Не найдена ", null, "Не найдена ")
          );
      }

      return res
        .status(200)
        .json(
          formatResponse(200, `Данные по ${id} успешно получены`, task)
        );
    } catch ({ message }) {
      console.log("=============PostController.getById=============", message);
      res
        .status(500)
        .json(formatResponse(500, "Внутренняя ошибка сервера", null, message));
    }
  }

  static async create(req, res) {
    const { user } = res.locals;
    /* const { isValid, error } = Post.validate(req.body);
    if (!isValid) {
      return res.status(400).json(formatResponse(400, error, null, error));
    } */

    try {
      const newTask = await PostService.create({
        ...req.body,
        user_id: user.id,
      });

      console.log(newTask, "=============PostController.create=============");

      if (!newTask)
        return res
          .status(400)
          .json(
            formatResponse(
              400,
              "не удалось создать запись в бд",
              null,
              "не удалось создать запись в бд"
            )
          );

      return res
        .status(201)
        .json(formatResponse(201, "Успешна создана новая таска", newTask));
    } catch ({ message }) {
      console.log("=============PostController.create=============", message);
      res
        .status(500)
        .json(formatResponse(500, "Внутренняя ошибка сервера", null, message));
    }
  }

  static async updateById(req, res) {
    const { id } = req.params;

    if (isNaN(id))
      return res
        .status(400)
        .json(
          formatResponse(
            400,
            "Невалидный id задачи",
            null,
            "Невалидный id задачи"
          )
        );

    /* const { isValid, error } = Post.validate(req.body);
    if (!isValid) {
      return res.status(400).json(formatResponse(400, error, null, error));
    } */

    try {
      const updatedTask = await PostService.updateById(id, req.body);

      if (!updatedTask)
        return res
          .status(404)
          .json(
            formatResponse(
              404,
              "не удалось найти запись в бд",
              null,
              "не удалось найти запись в бд"
            )
          );

      return res
        .status(200)
        .json(
          formatResponse(200, `Успешна изменена задача с id ${id}`, updatedTask)
        );
    } catch ({ message }) {
      console.log("=============PostController.update=============", message);
      res
        .status(500)
        .json(formatResponse(500, "Внутренняя ошибка сервера", null, message));
    }
  }

  static async deleteById(req, res) {
    const { id } = req.params;
    const { user } = res.locals;

    if (isNaN(id))
      return res
        .status(400)
        .json(
          formatResponse(
            400,
            "Невалидный id задачи",
            null,
            "Невалидный id задачи"
          )
        );

    try {
      const { error, data } = await PostService.deleteById(id, user);

      if (error === "Не нашли задачу")
        return res
          .status(404)
          .json(
            formatResponse(
              404,
              "не удалось найти запись в бд",
              null,
              "не удалось найти запись в бд"
            )
          );

      if (error === "Недостаточно прав")
        return res
          .status(400)
          .json(
            formatResponse(
              400,
              "недостаточно прав для удаления",
              null,
              "недостаточно прав для удаления"
            )
          );

      return res
        .status(200)
        .json(formatResponse(200, `Успешна удалена таска с id ${id}`, data));
    } catch ({ message }) {
      console.log("=============PostController.delete=============", message);
      res
        .status(500)
        .json(formatResponse(500, "Внутренняя ошибка сервера", null, message));
    }
  }

  static async like(req, res) {
    const { id } = req.params;
    if (isNaN(id))
      return res
        .status(400)
        .json(
          formatResponse(
            400,
            "Невалидный id поста",
            null,
            "Невалидный id поста"
          )
        );
    try {
      const post = await PostService.like(id);
      if (!post) {
        return res
          .status(404)
          .json(formatResponse(404, "Пост не найден", null, "Пост не найден"));
      }
      return res
        .status(200)
        .json(
          formatResponse(200, `Лайк успешно поставлен на пост ${id}`, post)
        );
    } catch ({ message }) {
      res
        .status(500)
        .json(formatResponse(500, "Внутренняя ошибка сервера", null, message));
    }
  }
  
}

module.exports = PostController;
