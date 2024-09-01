const Doner = require("../Models/doner");
const BloodBank = require("../Models/bloodBank");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWTcreate = require("../Config/jwtService");
const activationEmail = require("../service/activationEmailService");

const { tokenGenerator } = require("../Config/jwtService");
const { activationTokenGenerator } = require("../Config/activationJWTservice");
const User = require("../Models/user");

const authController = {
  donerRegister: async (req, res) => {
    const { fullName, email } = req.body;
    try {
      let doner = await Doner.findOne({ email });
      if (doner) {
        return res.status(400).json({ msg: "User Already Exists" });
      }
      await new Doner({
        fullName,
        email,
      }).save();
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Doner Registration Failed" });
    }
  },

  donerLogin: async (req, res) => {
    const { email, password } = req.body;
    try {
      let doner = await Doner.findOne({ email });
      if (!doner) {
        return res.status(400).json({ message: "Doner not found" });
      }

      const passwordMatch = await bcrypt.compare(password, doner.password);
      if (!passwordMatch) {
       return res.status(400).json({ message: "Invalid Credential" });
      }

      const token = tokenGenerator(doner.email);
      return res.status(200).json({ message: "User Loggin successfull", token: token });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Doner SignIn Failed" });
    }
  },

  bloodBankRegister: async (req, res) => {
    const { Email, RegNumber, BankName, Phone, Address, RoleId } = req.body;
    try {
      console.log(RegNumber);
      const userExsist = await BloodBank.findOne({ RegNumber });
      if (userExsist) {
        return res.status(400).json({ message: "User Exists" });
      } else {
        await new BloodBank({
          Email,
          RegNumber,
          BankName,
          Phone,
          Address,
          RoleId,
        }).save();

        const token = activationTokenGenerator(Email);
        await activationEmail({
          to: Email,
          subject: "Account Activation",
          message: `Click on the link to activate your account http://localhost:5174/activate/${Email}/${token}`,
        });

        return res.status(200).json({
          message:
            "Blood bank registration successfull, Please check your email to activate your account",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Blood bank registration failed" });
    }
  },

  bloodBankLogin: async (req, res) => {
    const { Email, Password } = req.body;
    try {
      if (!Email || !Password) {
        return res.status(400).json({ message: "Please fill all the fields" });
      }
      let userExsist = await BloodBank.findOne({ Email });
      if (!userExsist) {
        userExsist = await User.findOne({ Email });
        if (!userExsist) {
          return res.status(400).json({ message: "User Not Found" });
        }
      }
      const passwordMatch = await bcrypt.compare(Password, userExsist.Password);
      if (!passwordMatch) {
        return res.status(400).json({ message: "Invalid Credential" });
      }
      const token = JWTcreate.tokenGenerator(userExsist._id);
      return res
        .status(200)
        .json({ message: "User loggin successfull", token: token });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "SignIn Failed" });
    }
  },

  activationTokenValidate: async (req, res) => {
    const { Email, token } = req.params;
    try {
      const user = await BloodBank.findOne({ Email });
      if (!user) {
        const user = await User.findOne({ Email });
        if (!user) {
          return res.status(400).json({ message: "Invalid Activation URL" });
        }
      } else if (user.ActiveStatus) {
        return res.status(400).json({ message: "Account Already Activated" });
      } else {
        const secretKey = process.env.JWT_SECRET_KEY;
        try {
          const decoded = jwt.verify(token, secretKey);
          req.Email == decoded.userEmail;
          return res.status(200).json({ message: "Valid Token" });
        } catch (error) {
          return res.status(401).json({ Message: "Invalid Token" });
        }
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Account Activation Failed" });
    }
  },

  activateAccount: async (req, res) => {
    const { Email, Password, Cfpassword } = req.body;
    try {
      const user = await BloodBank.findOne({ Email });

      if (!user) {
        return res.status(400).json({ message: "Account not Found !" });
      }
      if (user.Activate) {
        return res.status(400).json({ message: "Account Already Activated" });
      }
      if (Password !== Cfpassword) {
        return res.status(400).json({ message: "Password Mismatch" });
      }
      
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(Password, salt);
        user.Password = hashedPassword;
        user.ActiveStatus = true;

        await user.save();
        return res.status(200).json({ message: "Account Activated Successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Account Activation Failed" });
    }
  },
};

module.exports = authController;
