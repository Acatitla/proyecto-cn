const { PostService } = require('../services/index.js');

module.exports = {
  create: async (req, res, next) => {
    try {
      const { body } = req;
      const newPost = await PostService.create(body);

      res.status(201).json({ payload: newPost });
    } catch (error) {
      next(error);
    }
  },
};