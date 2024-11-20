const router = require("express").Router();

const {addUser, userActivateTokenValidate, userActivate, getUserByBloodBankId} = require ("../Controllers/userController");

router.post("/addUser", addUser);
router.get("/userActivationValidate/:Email/:token", userActivateTokenValidate);
router.post("/userActivate", userActivate);
router.get("/getUserByBloodBankId/:id", getUserByBloodBankId);

module.exports = router;