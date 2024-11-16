const utills = {
  eligibilityCal(lastDonationDate, frequancy) {
    const today = new Date();
    const past = new Date(lastDonationDate);
    const diffTime = Math.abs(today - past);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const preferedDays = frequancy * 30;
    if (diffDays < preferedDays) {
      return false;
    } else {
      return true;
    }
  },

  dateToNextDonate(lastDonationDate, frequency) {
    const today = new Date();
    const past = new Date(lastDonationDate);
    const diffTime = Math.abs(today - past);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const preferredDays = frequency * 30;
    const daysLeft = preferredDays - diffDays;

    return daysLeft > 0 ? daysLeft : 0;
}
};

module.exports = utills;
