const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")

dotenv.config();

const secretKey = process.env.JWT_SECRET_KEY;
const activationTokenService = {

activationTokenGenerator: function (id) {
    
    const token = jwt.sign({ userID: id }, secretKey, { expiresIn: "3m" });
    return token;
}
}
module.exports = activationTokenService;
