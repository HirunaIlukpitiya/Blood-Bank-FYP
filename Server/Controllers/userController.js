const User = require("../Models/user");
const bcrypt = require("bcryptjs");
const activationEmail = require("../service/activationEmailService");
const { tokenGenerator } = require("../Config/jwtService");
const { activationTokenGenerator } = require("../Config/activationJWTservice");
const jwt = require("jsonwebtoken");
const JWTcreate = require("../Config/jwtService");


const UserController = {
  addUser: async (req, res) => {
    const {
      FirstName,
      NIC,
      LastName,
      Email,
      Phone,
      RoleId,
      AccountType,
      RegNumber,
    } = req.body;
    try {
      let user = await User.findOne({ NIC });
      if (user) {
        return res.status(400).json({ message: "User already exists" });
      }
      const token = activationTokenGenerator(Email, "15m");
      await activationEmail({
        to: Email,
        subject: "Account Activation",
        message: `Click on the link to activate your account http://localhost:5174/activate/${Email}/${token}`,
      });
      console.log(`http://localhost:5174/activate/${Email}/${token}`);      
      

      user = new User({
        FirstName,
        NIC,
        LastName,
        Email,
        Phone,
        RoleId,
        AccountType,
        RegNumber,
      });
      await user.save();
      return res.status(200).json({ message: "User added successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "User addition failed" });
    }
  },

  userActivateTokenValidate: async (req, res) => {
    const { Email, token } = req.params;
    console.log(Email, token);
    try {
      const user = await User.findOne({
        Email,
      });
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }
      if (user.ActiveStatus) {
        return res.status(400).json({ message: "User already activated" });
      }

      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        // if (decoded.Email !== Email) {
        //   return res.status(400).json({ message: "Invalid Token" });
        // }
      } catch (error) {
        return res.status(400).json({ message: "Invalid Token" });
      }
      return res.status(200).json({ message: "Valid URL" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "User activation failed" });
    }
  },

    userActivate: async (req, res) => {
        const { Email, Password, Cfpassword } = req.body;
        try {
        const user = await User.findOne({Email});
        if(!user){
            return res.status(400).json({message: "User not found"});
        }
        if(user.ActiveStatus){
            return res.status(400).json({message: "User already activated"});
        }
        if(Password !== Cfpassword){
            return res.status(400).json({message: "Passwords do not match"});
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(Password, salt);
        user.Password = hashedPassword;
        user.ActiveStatus = true;
        await user.save();

        return res.status(200).json({message: "User activated successfully"});
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "User activation failed" });
        }
    },
};

module.exports = UserController;
