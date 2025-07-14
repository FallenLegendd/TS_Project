const commentRouter = require("express").Router();
const CommentController = require("../controllers/Comment.controller");
const verifyAccessToken = require("../middleware/verifyAccessToken");

commentRouter
  .get("/", CommentController.getAll)
  .get("/:id", CommentController.getById)
  .get("/post/:postId", CommentController.getAllForPost)
  .get("/user/:userId/post/:postId", CommentController.getAllForPostByUser)
  .post("/", verifyAccessToken, CommentController.create)
  .put("/:id", verifyAccessToken, CommentController.update)
  .delete("/:id", verifyAccessToken, CommentController.delete);

module.exports = commentRouter;
