//methods for strava activities

const addtodb = require("../db");

module.exports = {
  //process all the activities
  async pointsProcesser(data) {
    for (e of data) {
      //not expecting any data back
      eachPointsAdded = await addtodb.addpoints(
        e.dataValues.alias,
        e.dataValues.distance
      );
    }
  },
};
