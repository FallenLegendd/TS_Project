const { Comment } = require('../db/models');

class CommentService {

    static async getAll() {
        return await Comment.findAll()
    }

    static async getById(id) {
        return await Comment.findByPk(id)
    }

    static async getAllForThisPost(postId){
        return await Comment.findAll({where: {post_id: postId}})
    }

    static async getAllForThisPostWithUsers(userId, postId){
        return await Comment.findAll({where: {user_id: userId, post_id: postId}})
    } 

    static async createComment(data){
        return await Comment.create(data)
    }

    static async updateById(id, data) {
    const commentForUpdate = await this.getById(id);

    const { text } = data;
    
    if (text) {
      commentForUpdate.text = text;
    }

    await commentForUpdate.save();
    return commentForUpdate;
  }
}

module.exports = CommentService;