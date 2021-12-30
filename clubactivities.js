//methods for strava activities

const addtodb = require("./db/db");

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
      thedata = data.splice(0, 24);
    });
    return thedata;
  },

  //process all the activities
  async activitiesProcesser(data) {
    const allerrors = [];
    const allsaved = [];

    for (const element of data) {
      let distance = element.distance / 1000;
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
