var stravaApi = require("strava-v3");

require("dotenv").config();

client_id = process.env.client_id;
client_secret = process.env.client_secret;
access_token = process.env.access_token;
refresh_token = process.env.refresh_token;
expires = process.env.expires_at;
let strava;

const checker = require("./token");
const stravadata = require("./clubactivities");

function settingStravaCredentials() {
  console.log("settingStravaCredentials");
  // console.log("settingStravaCredentials");
  stravaApi.config({
    access_token: access_token,
    client_id: client_id,
    client_secret: client_secret,
  });
  this.strava = new stravaApi.client(access_token);
  //   this.strava.clubs
  //     .listActivities({ id: 962767 }, (palyoad) => {
  //       console.log(palyoad);
  //     })
  //     .then((data) => console.log(data));
  stravadata.getClubActivities(this.strava);
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
  //then if refresh token successfully, set credentials
  .then((data) => {
    console.log("token has been refreshed"),
      //   console.log(data),
      settingStravaCredentials(data);
  })
  //refresh token failed
  .catch((err) => {
    console.log(err);
  });
