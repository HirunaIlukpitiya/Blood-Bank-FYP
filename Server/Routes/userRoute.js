const router = require("express").Router();

const {addUser, userActivateTokenValidate, userActivate} = require ("../Controllers/userController");

router.post("/addUser", addUser);
router.get("/userActivationValidate/:Email/:token", userActivateTokenValidate);
router.post("/userActivate", userActivate);

module.exports = router;