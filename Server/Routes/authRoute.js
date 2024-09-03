const router = require("express").Router();

const {donerRegister, donerLogin, bloodBankRegister, bloodBankLogin, activationTokenValidate, activateAccount, donorActivationTokenValidate, donorActivateAccount} = require ("../Controllers/authController");

router.post("/donorRegister", donerRegister);
router.post("/donorLogin", donerLogin);

router.get("/donorActivationValidate/:Email/:token", donorActivationTokenValidate);
router.post("/donorActivateAccount", donorActivateAccount);

router.post("/bankRegister", bloodBankRegister);
router.post("/bankLogin", bloodBankLogin);

router.get("/activationValidate/:Email/:token", activationTokenValidate);
router.post("/activateAccount", activateAccount);



module.exports = router;