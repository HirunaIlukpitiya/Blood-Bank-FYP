const router = require("express").Router();

const {donerRegister, donerLogin, bloodBankRegister, bloodBankLogin} = require ("../Controllers/authController");

router.post("/donerRegister", donerRegister);
router.post("/donerLogin", donerLogin);

router.post("/bankRegister", bloodBankRegister);
router.post("/bankLogin", bloodBankLogin);

module.exports = router;