const { unfollow } = require('../controllers/UserController.js');
const { User } = require('../models/index.js');

module.exports = {
  create: (body) => new User(body).save(),
  emailExist: (email)=> User.exists({ email }), //true or false
  findOneByEmail: (email) => User.findOne({ email }), 
  findOneById: (id) => User.findById({ id }),
  updateOne: (user, body)=> {
    Object.assign(user, body);
    return user.save();
  },
  follow: (id, targerId, type) => User.findOneAndUpdate(id, { $addToSet: { [type]: targerId}}), 
  unfollow: (id, targerId, type) => User.findOneAndUpdate(id, { $pull: { [type]: targerId}}),
  
};