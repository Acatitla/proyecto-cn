const { User } = require('../models/index.js');

module.exports = {
  create: (body) => new User(body).save(),
  emailExist: (email)=> User.exists({ email }), //true or false
  findOneByEmail: (email) => user.findOne({ email }), 
};