const postRouter = require('express').Router();
const PostController = require('../controllers/Post.controller');
const verifyAccessToken = require('../middleware/verifyAccessToken');

postRouter
  .get('/', PostController.getAll)
  .get('/all', PostController.getAllSorted)
  .get('/:id', PostController.getById)
  .post('/', verifyAccessToken, PostController.create)
  .put('/:id', verifyAccessToken, PostController.updateById)
  .put('/:id/like', PostController.like)
  .delete('/:id', verifyAccessToken, PostController.deleteById);

module.exports = postRouter;
