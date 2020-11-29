const express = require ('express');
const {UserController } = require ('../controllers/index.js')

const router = express.Router();

router.use('/login', UserController.login);
router.use('/singup', UserController.create);

module.exports = router;