const { PostService } = require('../services/index.js');

module.exports = {
  create: async (req, res, next) => {
    try {
      const { img_url, description } = req.body;
      const { id } = req.decoded;
      const post = await PostService.create({user_id: id, img_url, description});
      res.status(201).json({ payload: post });
    } catch (error) {
      response.status(400).json({ error: error.message });
    }
  },
  delete: async (req, res, next) => {
    try {
      const { img_url, description } = req.body;
      const { id } = req.decoded;
      const deletePost = await PostService.delete({user_id: id, img_url, description});
      res.status(201).json({ payload: deletePost });
    } catch (error) {
      response.status(400).json({ error: error.message });
    }
  }
};