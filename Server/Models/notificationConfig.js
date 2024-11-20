const mongoose = require("mongoose");

const recivers = mongoose.Schema(
    {
        userId: {
        type: String,
        required: true,
        },
        NotificationType: {
        type: String,
        required: true,
        },
    },
)

const notificationConfigSchema = mongoose.Schema(
    {
        bloodBankId: {
            type: String,
            required: true,
        },
        Recivers: [recivers],
    },
    {
        timestamps: true,
    }
);

const NotificationConfig = mongoose.model(
  "NotificationConfig",
  notificationConfigSchema
);
module.exports = NotificationConfig;
