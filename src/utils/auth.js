const bcrypt = require ('bcrypt');

module.exports = {
    comparePasswords: ( password, hash )=> bcrypt.compareSync(password, hash),
};