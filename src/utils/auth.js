const bcrypt = require ('bcrypt');
const jwt = require ('jsonwebtoken');

module.exports = {
    comparePasswords: ( password, hash )=> bcrypt.compareSync(password, hash),
    createToken: ({ id, email, first_name })=>{
        try {
            const payload = {
                id, 
                email,
                first_name,
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1h'});
        } catch (error) {
            
        }
    }
};