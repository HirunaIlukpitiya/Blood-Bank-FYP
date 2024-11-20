const router = require('express').Router();

const {addNotificationConfig, getNotificationConfig, updateNotificationConfig} = require('../Controllers/notificationConfigController');

router.post("/addNotificationConfig/:bloodBankId", addNotificationConfig);
router.get("/getNotificationConfig/:bloodBankId", getNotificationConfig);

module.exports = router;