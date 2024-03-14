const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const tokenValidate = (req, res, next) =>{
    const token = req.header('Authorization');

    if(!token){
        res.status(401).json({Message: "Access Denied"});
    }
    const secretKey = process.env.JWT_SECRET_KEY;
    try{
        const decoded = jwt.verify(token, secretKey);
        req.userID == decoded.userID;
        next();
    }
    catch(error){
        res.status(401).json({Message: "Invalid Token"});
    }
}

module.exports =  tokenValidate;