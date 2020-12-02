const router = express.Router();
const express = require('express');
const { PostController } = require('../controllers/index.js');
const { PostValidator } = require('../validators/index.js');
const { verifyToken } = require('../middlewares/index.js');

const router = express.Router();

router.post('/posts', verifyToken, PostValidator.create, PostController.create);

router.post('/posts', verifyToken, PostValidator.delete, PostController.delete);

module.exports = router;
