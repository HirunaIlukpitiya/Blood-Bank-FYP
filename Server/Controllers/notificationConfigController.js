const NotificationConfig = require("../Models/notificationConfig");

const notificationConfigController = {

    addNotificationConfig: async (req, res) => {
        const bloodBankdId = req.params.bloodBankId;
        const {
            userId,
            NotificationType
        } = req.body;

        const recordExists = await NotificationConfig.findOne({bloodBankdId});
        if (recordExists) {
            recordExists.Recivers.push({
                userId,
                NotificationType
            });

            await recordExists.save();
            return res.status(200).json({ message: "Notification Config updated successfully", config: recordExists });
        }

        try {
            const newNotificationConfig = new NotificationConfig({
                bloodBankdId,
                Recivers: [{
                    userId,
                    NotificationType
                }]
            });

            await newNotificationConfig.save();
            return res.status(200).json({ message: "Notification Config added successfully", config: newNotificationConfig });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Failed to add Notification Config" });
        }
    },

    getNotificationConfig: async (req, res) => {
        const bloodBankdId = req.params.bloodBankId;
        try {
            const notificationConfig = await NotificationConfig.findOne({bloodBankdId});
            if (!notificationConfig) {
                return res.status(404).json({ message: "Notification Config not found" });
            }
            return res.status(200).json(notificationConfig);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Failed to get Notification Config" });
        }
    },
};

module.exports = notificationConfigController;