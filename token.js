//checking token's state
//refresh token if expired
const axios = require("axios").default;

module.exports = {
  tokenChecker() {
    return new Promise((resolve, reject) => {
      tokenValidity = Math.floor(new Date() / 1000);
      console.log(tokenValidity);
      console.log(expires);
      0;
      //if not expired
      if (expires > tokenValidity) {
        // console.log("havent expire");
        // resolve("can use token");
        resolve(access_token);
      }
      //if expired
      else {
        // console.log("expired liao");
        reject("change token");
      }
    });
  },

  async refreshToken() {
    console.log("refreshing token now");
    console.log(access_token);

    await axios
      .post("https://www.strava.com/api/v3/oauth/token", {
        client_id: client_id,
        client_secret: client_secret,
        grant_type: "refresh_token",
        refresh_token: refresh_token,
      })
      .then(function (response) {
        // console.log("response");
        console.log(response.data.access_token);
        //Resetting the variable. these tokens are temporary use so i need not watch
        expires = response.data.expires_at;
        access_token = response.data.access_token;
        console.log(expires);
        return access_token;
        // settingStravaCredentials();
      })
      .catch(function (error) {
        console.log("error");
        console.log(error);
        return "error";
      });
  },
};
