var strava = require("strava-v3");

require("dotenv").config();

client_id = process.env.client_id;
client_secret = process.env.client_secret;
access_token = process.env.access_token;
refresh_token = process.env.refresh_token;

strava.config({
  access_token: access_token,
  client_id: client_id,
  client_secret: client_secret,
});
