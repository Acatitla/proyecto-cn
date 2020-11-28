const { UserService } = require('../services/index.js');

module.exports = {
  create: async (request, response, next) => {
    try {
      const { body } = request;
      const newUser = await UserService.create(body);
      response.status(201).json({ payload: newUser });
    } catch (error) {
      next(error);
    }
  },
};