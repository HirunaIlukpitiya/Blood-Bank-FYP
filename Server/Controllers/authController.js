const Doner = require("../Models/doner");
const BloodBank = require("../Models/bloodBank");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWTcreate = require("../Config/jwtService")

const {tokenGenerator} = require ("../Config/jwtService");

const authController = {
  donerRegister: async (req, res) => {
    const { fullName, email, password, cPassword } = req.body;
    try {
      let doner = await Doner.findOne({ email });
      if (doner) {
        return res.status(400).json({ msg: "User Already Exists" });
      }
      if (password !== cPassword) {
        return res.status(400).json({ msg: "Password not matching" });
      }
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);

      await new Doner({
        fullName,
        email,
        password: hashPassword,
      }).save();
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Doner Registration Failed" });
    }
  },

  donerLogin: async (req, res) => {
    const { email, password } = req.body;
    try {
      let doner = await Doner.findOne({email});
      if (!doner) {
        res.status(400).json({ message: "Doner not found" });
      }

      const passwordMatch = await bcrypt.compare(password, doner.password);
      if (!passwordMatch) {
        res.status(400).json({ message: "Invalid Credential" });
      }

      const token = tokenGenerator(doner.email);
      res.status(200).json({message: "User Loggin successfull",token: token})

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Doner SignIn Failed" });
    }
  },

  bloodBankRegister: async (req, res) => {
    const {email, regNumber, password, cPassword} = req.body;
    try{
        const userExsist = BloodBank.findOne({regNumber});
        if(userExsist){
            res.status(400).json({message: "User Exists"})
        }
        if (password !== cPassword){
            res.status(400).json({message : "Password not matching"})
        }

        const salt = bcrypt.getSalt();
        const hashPassword = await bcrypt.hash(password,salt);

        await new BloodBank({
            email,
            regNumber,
            password: hashPassword,
        }).save();

    }
    catch(error){
        console.log(error);
        res.status(500).json({message : "Blood bank registration failed"});
    }
  },

  bloodBankLogin : async (req, res) =>{
    const {regNumber, password} = req.body;
    try{
        const userExsist = await BloodBank.findOne({regNumber});
        if(!userExsist){
            res.status(400).json({message : "User Not Found"});
        }
        const passwordMatch = await bcrypt.compare(password,userExsist.password);
        if(!passwordMatch){
            res.status(400).json({message : "Invalid Credential"});
        }
        const token = JWTcreate.tokenGenerator(userExsist._id);
        res.status(200).json({message: "User loggin successfull", token : token})
    }
    catch(error){

    }
  }
};

module.exports = authController;
