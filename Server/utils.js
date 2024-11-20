const utills = {
  eligibilityCal(lastDonationDate, frequancy) {
    const today = new Date();
    const past = new Date(lastDonationDate);
    console.log('lastDonationDate:', lastDonationDate);
    console.log('Parsed past date:', past);

    const diffTime = Math.abs(today - past);
    console.log('diffTime:', diffTime);

    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    console.log('diffDays:', diffDays);

    const preferredDays = frequancy * 30;
    console.log('preferredDays:', preferredDays);

    if (diffDays < preferredDays) {
        return false;
    } else {
        return true;
    }
  },

  dateToNextDonate(lastDonationDate, frequency) {
    const today = new Date();
    const past = new Date(lastDonationDate);
    console.log(today);
    console.log(past);
    const diffTime = Math.abs(today - past);
    console.log(diffTime);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const preferredDays = frequency * 30;
    const daysLeft = preferredDays - diffDays;

    return daysLeft > 0 ? daysLeft : 0;
}
};

module.exports = utills;
