const router = require("express").Router();

const {donerRegister, donerLogin, bloodBankRegister, bloodBankLogin, activationTokenValidate, activateAccount} = require ("../Controllers/authController");

router.post("/donerRegister", donerRegister);
router.post("/donerLogin", donerLogin);

router.post("/bankRegister", bloodBankRegister);
router.post("/bankLogin", bloodBankLogin);

router.get("/activationValidate/:Email/:token", activationTokenValidate);
router.post("/activateAccount", activateAccount);



module.exports = router;