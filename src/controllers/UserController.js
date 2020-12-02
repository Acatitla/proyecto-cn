const { UserService } = require('../services/index.js');
const auth = require ('../utils/auth.js');

module.exports = {
  create: async (request, response, next) => {
    try {
      const { body } = request;
      const emailExist = await UserService.emailExist(body.email);
      if(emailExist) throw new Error('Este correo ya está registrado');
      const newUser = await UserService.create(body);
      response.status(201).json({ payload: newUser });
    } catch (error) {
      response.status(400).json({ error: error.message });
    }
  },

  login: async(req, res) =>{
    try {
      const { email, password } = req.body;
      const user = await UserService.findOneByEmail({email});
      if(!user) throw new Error('Error, Credenciales incorrectas');
      const sync = auth.compareSync(password, user.password);
      if(!sync) throw new Error('Error, Credenciales incorrectas');
      const token = auth.createToken(user);
      //por hacer: agregar token y enviarlo
      res.status(200).send({ payload: 'ok' });
    } catch (error) {
      response.status(400).json({ error: error.message });
    }
  },
  update: async () => {
    try {
      const { decoded, body } = req.decoded;
      const user = await UserService.findOneById(decoded.id);
      if(!user) throw new Error('user not found');
      const modifiedUser = await UserService.updateOne(user, body);
      modifiedUser.password = undefined;
      res.status(200).send({ payload });
    } catch (error) {
      response.status(400).json({ error: error.message });
    }
  },
  follow: async (request, response) => {
    try {
      const { decoded, params } = request;
      const followerUser = decoded.id;
      const followingUser = params.id;
      const following = await UserService.follow(followingUser, followerUser, 'following');
      const follower = await UserService.follow(followingUser, followerUser, 'follower');
      following.password = undefined;
      follower.password = undefined;
      response.status(201).json({ payload: { follower, following} });
    } catch (error) {
      response.status(400).json({ error: error.message });
    }
  },
  unfollow: async (request, response) => {
    try {
      const { decoded, params } = request;
      const followerUser = decoded.id;
      const followingUser = params.id;
      const following = await UserService.unfollow(followingUser, followerUser, 'following');
      const follower = await UserService.unfollow(followingUser, followerUser, 'following');
      following.password = undefined;
      follower.password = undefined;
      response.status(201).json({ payload: { follower, following} });
    } catch (error) {
      response.status(400).json({ error: error.message });
    }
  },
};