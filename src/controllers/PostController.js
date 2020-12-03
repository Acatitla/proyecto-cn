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
      const { id }= decoded.id;
      const { postId } = req.params;
      const post = await PostService.findOneById(params.postId);
      if(post.user_id !== id) throw new Error('Bad credentials');
      const deletePost = await PostService.delete(postId);
      res.status(201).json({ payload: deletePost });
    } catch (error) {
      response.status(400).json({ error: error.message });
    }
  },
  like: async (req, res, next) => {
    try {
      const { postId, description } = req.params;
      const { id } = req.decoded;
      const post = await PostService.like(postId, id).exec();
      res.status(201).json({ payload: post });
    } catch (error) {
      response.status(400).json({ error: error.message });
    }
  },
  likeRemove: async (req, res, next) => {
    try {
      const { postId, description } = req.params;
      const { id } = req.decoded;
      const post = await PostService.likeRemove(postId, id).exec();
      res.status(201).json({ payload: post });
    } catch (error) {
      response.status(400).json({ error: error.message });
    }
  },
  comment: async (req, res) => {
    try {
      const { body, params, decoded } = req;
      const post = await PostService.findOneById(params.postId);
      if(post.user_id !== decoded.id) throw new Error('Bad credentials');
      const comment = await PostService.comment(params.postId, decoded.id, body.comment);
      res.status(201).json({ payload: comment });
    } catch (error) {
      response.status(400).json({ error: error.message });
    }
  },
  commentRemove : async (req, res) => {
    try {
      const { body, params, decoded } = req;
      const deleteComment = await PostService.commentRemove(params.postId, body.commentId);
      res.status(201).json({ payload: comment });
    } catch (error) {
      response.status(400).json({ error: error.message });
    }
  },
};