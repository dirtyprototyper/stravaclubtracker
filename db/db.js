const { Sequelize } = require("sequelize");
const logger = require("../logger/logger");

const sequelize = new Sequelize(
  //db:
  "bravoclub",
  // username:
  "strava",
  //password:
  "bravoclubpassword",
  {
    host: "localhost",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },

    logging: (msg) => logger.info(msg),
  }
);
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Members = require("./model/members.js")(sequelize, Sequelize);
db.Activity = require("./model/activity.js")(sequelize, Sequelize);

module.exports = {
  //save to db using sequelize
  async addactivity(name, dist, t) {
    individual = await db.Activity.create({
      alias: name,
      distance: dist / 1000, //keeping it in km
      activitytime: t, //seconds
    })
      .then((item) => {
        return item;
      })
      .catch((error) => {
        if (error != null) {
          logger.error(error.errors[0]);
          return {
            error: error.errors[0].message,
            value: error.errors[0].instance.dataValues,
          };
        }
      });

    //returning error or result. Do not use catching on the other end
    return individual;
  },

  //collating the points
  async addpoints(name, awardedpoints) {
    test = await db.Members.findByPk(name).then((item) => {
      if (item.dataValues.points != null) {
        return item.dataValues.points;
      } else {
        return null;
      }
    });

    //no record.
    if (test == null) {
      await db.Members.update(
        { points: awardedpoints }, //km
        { where: { alias: name } }
      ).catch((e) => {
        logger.error(e.original);
      });
    }
    //have existing records for points
    else if (test != null) {
      await db.Members.update(
        { points: awardedpoints + test },
        { where: { alias: name }, returning: true, plain: true }
      ).catch((e) => {
        logger.error(e.original);
      });
    }
  },
};

async function testconnect() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    //members

    //return all members
    // db.Members.findAll().then((member) => {
    //   console.log("All users:", JSON.stringify(member, null, 4));
    // });

    //return 1
    // db.Members.findAll({ where: { alias: "Brandonlohhh-." } }).then(
    //   (member) => {
    //     console.log("All users:", JSON.stringify(member, null, 4));
    //   }
    // );

    // db.Activity.findAll().then((activity) => {
    //   console.log("All users:", JSON.stringify(activity, null, 4));
    // });

    //add activity to table
    // clubactivity = await addactivity();
    // console.log(clubactivity.toJSON());
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

testconnect();
