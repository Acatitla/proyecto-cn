const jwt = require ('jsonwebtoken');

module.exports = {
    dateNow: (req, res, next) => {
      console.log(new Date().toDateString());
      next();
    },
    verifyToken: (req, res, next) => {
     try{ 
       const {athorization } = req.headers;
      const token =athorization.split('')[1];
      req.decoded = jwt.verify(token, process.env.JWT_SECRET);
      next();
    }catch(error){
      res.status(401).json({error: error.message})
     } 
    },
    
  };