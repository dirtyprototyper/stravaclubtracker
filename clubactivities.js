//methods to call strava activities

module.exports = {
  getClubActivities(strava) {
    //call another function to do whatever u want
    strava.clubs
      .listActivities({ id: 962767 }, (palyoad) => {})
      .then((data) => console.log(data));
  },
};
