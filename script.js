var stravaApi = require("strava-v3");

require("dotenv").config();

client_id = process.env.client_id;
client_secret = process.env.client_secret;
access_token = process.env.access_token;
refresh_token = process.env.refresh_token;
expires = process.env.expires_at;

const checker = require("./token");
const stravahelper = require("./db/helpers/stravahelper");
const dbhelper = require("./db/helpers/dbhelper");
const logger = require("./logger/logger");

async function settingStravaCredentials() {
  stravaApi.config({
    access_token: access_token,
    client_id: client_id,
    client_secret: client_secret,
  });
  this.strava = new stravaApi.client(access_token);

  //get Bravo Club Activities from strava
  let bravodata = await stravahelper.getClubActivities(this.strava);

  let issues;
  let noissues;

  //Normal process of all the activities
  records = await stravahelper.activitiesProcesser(bravodata).then((data) => {
    issues = data.allerrors;
    noissues = data.allsaved;
  });

  //check which has been saved properly and errors
  // console.log(noissues[0].dataValues);
  // console.log(issues);

  //pass in all those without issues to add points
  if (noissues[0] != null) {
    //check if they have points

    //add for normal distance
    dbhelper.pointsProcesser(noissues);

    //update
  } else if (noissues[0] == null) {
    logger.debug(issues);
    return issues;
  }
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
