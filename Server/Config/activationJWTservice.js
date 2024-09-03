const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")

dotenv.config();

const secretKey = process.env.JWT_SECRET_KEY;
const activationTokenService = {

activationTokenGenerator: function (id,time) {
    
    const token = jwt.sign({ userID: id }, secretKey, { expiresIn: time });
    return token;
}
}
module.exports = activationTokenService;
