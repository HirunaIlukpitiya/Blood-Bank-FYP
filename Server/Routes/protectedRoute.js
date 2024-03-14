const express = require("express");
const router = express.Router();
const tokenValidate  = require("../Middleware/authMiddleware")

const {testGet} = require ("../Controllers/testController");

router.get("/testGet",tokenValidate,testGet);

module.exports = router;