const cron = require('node-cron');
const nodemailer = require('nodemailer');
const StockData = require('../Models/stockData');
const NotificationConfig = require('../Models/notificationConfig');
const Threshold = require('../models/Threshold');
const Alert = require('../Models/Alert');


const stockAlert = async () => {
    const stockData = await StockData.find();
    const notificationConfig = await NotificationConfig.find();
    const threshold = await Threshold.find();

    for(let i = 0; i < stockData.length; i++) {
        const stock = stockData[i];
        const config = notificationConfig.find((config) => config.bloodBankdId === stock.bloodBankId);
        const thresholdData = threshold.find((threshold) => threshold.bloodBankId === stock.bloodBankId).Thresholds;
        console.log(thresholdData);
        console.log(stockData);
        if(!config || !thresholdData) {
            continue;
        }

        for (let j = 0; j < thresholdData.length; j++) {
            const thresholdItem = thresholdData[j];
            const stockValue = stock[thresholdItem.keyName];

            if (stockValue !== undefined && stockValue < thresholdItem.value) {
                try {
                const alert = new Alert({
                    bloodBankId: stock.bloodBankId,
                    bloodGroup: thresholdItem.bloodGroup,
                    productName: thresholdItem.productName,
                });
                await alert.save();
            } catch (error) {
                console.log(error);
            }
            }
        }

    }
console.log("stockAlert runing")
};


cron.schedule('*/60 * * * * *', stockAlert);

module.exports = stockAlert;