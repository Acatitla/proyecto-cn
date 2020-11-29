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
      //por hacer: agregar token y enviarlo
      res.status(200).send({ payload: 'ok' });
    } catch (error) {
      response.status(400).json({ error: error.message });
    }
  }

};