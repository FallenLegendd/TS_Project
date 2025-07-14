const apiRouter = require("express").Router();
const formatResponse = require("../utils/formatResponse");
const postRouter = require("./post.routes");
const authRouter = require("./auth.routes");
const commentRouter = require("./comment.routes");

apiRouter.use("/auth", authRouter);
apiRouter.use("/posts", postRouter);
apiRouter.use("/comments", commentRouter);

apiRouter.use((req, res) => {
  res
    .status(404)
    .json(formatResponse(404, "Ресурс не найден", null, "Ресурс не найден"));
});

module.exports = apiRouter;
