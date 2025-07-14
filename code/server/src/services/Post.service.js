const { Post } = require('../db/models');

class PostService {
  static async getAll() {
    return await Post.findAll();
  }

  static async getById(id) {
    return await Post.findByPk(id);
  }

  static async getAllSorted(){
    const data = await Post.findAll({order: [[`id`, `DESCg`]]})
    console.log(data);
    return data
  }

  static async like(postId){
    const data = await Post.findByPk(postId)
    data.likeCount = data.likeCount + 1
    data.save()
    return data
  }

  static async create(data) {
    return await Post.create(data);
  }

  static async bulkCreate(data) {
    return await Post.bulkCreate(data);
  }

  static async updateById(id, data) {
    const taskForUpdate = await this.getById(id);
    

    if (!taskForUpdate) return null;

    const { image, text } = data;
    if (image) {
      taskForUpdate.image = image;
    }

    if (text) {
      taskForUpdate.text = text;
    }

    await taskForUpdate.save();
    return taskForUpdate;
  }

  static async deleteById(id, user) {
    const taskForDestroy = await this.getById(id);

    if (!taskForDestroy)
      return {
        data: null,
        error: 'Не нашли задачу',
      };

    if (taskForDestroy.user_id !== user.id)
      return {
        data: null,
        error: 'Недостаточно прав',
      };

    return {
      error: null,
      data: await taskForDestroy.destroy(),
    };
  }
}

module.exports = PostService;
