const Donor = require('../Models/donor');
const cron = require('node-cron');

const donationAlert = async () => {

    const donors = await Donor.find();
    for (let i = 0; i < donors.length; i++) {
        const donor = donors[i];
        const lastDonationDate = donor.lastDonationDate;
        const today = new Date();
        const diffTime = Math.abs(today - lastDonationDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const freq = donor.Frequency;
        if (freq === "4" && diffDays > 120) {
            console.log("Donation Alert");
        } else if (freq === "6" && diffDays > 180) {
            console.log("Donation Alert");
        } else if (freq === "12" && diffDays > 365) {
            console.log("Donation Alert");
        } 
    }
    console.log("Donation Alert running");
};

cron.schedule('*/60 * * * * *', donationAlert);
module.exports = donationAlert;
