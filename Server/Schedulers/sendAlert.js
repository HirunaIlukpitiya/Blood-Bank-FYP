const Alert = require('../Models/Alert');
const NotificationConfig = require('../Models/notificationConfig');
const nodemailer = require('nodemailer');
const cron = require('node-cron');
const User = require('../Models/user');

const sendAlert = async () => {
    console.log("sendAlert running");
    const alerts = await Alert.find({massageSent: false});
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });
    for (let i = 0; i < alerts.length; i++) {
        const alert = alerts[i];
        console.log(alert);
        const config = await NotificationConfig.findOne({bloodBankId: alert.bloodBankId});
        console.log (config);
        if (!config) {
            continue;
        } else {
        const receivers = config.Recivers;
        for (let j = 0; j < receivers.length; j++) {
            const receiver = receivers[j];
            const id = receiver.userId;
            const userData = await User.findById(id);
            console.log(userData);
            if (receiver.NotificationType === "SMS") {
                // send SMS need to configure (paused due to cost)
            } else if (receiver.NotificationType === "Email") {
                const mailOptions = {
                    from: process.env.EMAIL,
                    to: "receiver",
                    subject: 'Stock Minimum Threshold Alert',
                    text: `${alert.bloodGroup}  ${alert.productName} stock is below minimum alert level`
                };
                await transporter.sendMail(mailOptions);
            }
        }
        alert.massageSent = true;
        await alert.save();
    }
    }
};

cron.schedule('*/60 * * * * *', sendAlert);

module.exports = sendAlert;