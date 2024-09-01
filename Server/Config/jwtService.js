const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")

dotenv.config();

const secretKey = process.env.JWT_SECRET_KEY;
const tokenService = {

tokenGenerator: function (Email) {
    
    const token = jwt.sign({ userEmail: Email }, secretKey, { expiresIn: "3m" });
    return token;
}
}
module.exports = tokenService;
