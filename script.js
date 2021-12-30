var stravaApi = require("strava-v3");

require("dotenv").config();

client_id = process.env.client_id;
client_secret = process.env.client_secret;
access_token = process.env.access_token;
refresh_token = process.env.refresh_token;
expires = process.env.expires_at;

const checker = require("./token");
const bravoactivities = require("./clubactivities");

async function settingStravaCredentials() {
  stravaApi.config({
    access_token: access_token,
    client_id: client_id,
    client_secret: client_secret,
  });
  this.strava = new stravaApi.client(access_token);

  //get Bravo Club Activities from strava
  let bravodata = await bravoactivities.getClubActivities(this.strava);

  let issues;
  let noissues;
  //then process all the activities
  records = await bravoactivities
    .activitiesProcesser(bravodata)
    .then((data) => {
      issues = data.allerrors;
      noissues = data.allsaved;
    });

  //check which has been saved properly and errors
  // console.log(noissues);
  // console.log(issues);
}

//Check token first before anything else.
checker
  .tokenChecker()
  //if token is valid:
  .then((data) => {
    console.log("token is valid"),
      console.log(data),
      settingStravaCredentials(data);
  })
  //if it is not valid, refresh:
  .catch((err) => checker.refreshToken())
  // if refreshed successfully, set credentials
  .then((data) => {
    console.log("token has been refreshed"), settingStravaCredentials(data);
  })
  //refresh token failed
  .catch((err) => {
    console.log(err);
  });
