//methods for strava activities

const addtodb = require("../db");

module.exports = {
  async getClubActivities(strava) {
    id = 962767;
    var opts = {
      id: 962767,
      page: 1, //Page number. Defaults to 1. Integer
      per_page: 200, // Number of items per page. Defaults to 30.Integer
    };

    let thedata;

    //return all activities
    await strava.clubs.listActivities(opts).then((data) => {
      thedata = data.splice(0, 27);

      //to do:
      //refer to test.js for filtering of activiies

      console.log("all club data");
      console.log(thedata);
    });
    return thedata;
  },

  //process all the activities
  async activitiesProcesser(data) {
    const allerrors = [];
    const allsaved = [];

    for (const element of data) {
      let distance = element.distance;
      let name = element.athlete.firstname + element.athlete.lastname;
      let time = element.moving_time;

      //call method to save
      singledone = await addtodb.addactivity(name, distance, time).then((d) => {
        // console.log("logging either error or value");
        // console.log(d);
        if (d.error != null) {
          allerrors.push(d);
        } else {
          allsaved.push(d);
        }
      });
    }

    return { allerrors, allsaved };
  },
};
