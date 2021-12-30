module.exports = function (sequelize, Sequelize) {
  const Activity = sequelize.define(
    "activity",
    {
      alias: {
        type: Sequelize.STRING,
        // autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },

      activityname: {
        type: Sequelize.STRING,
        //  allowNull: false
      },

      // activitydescription: {
      //     type: Sequelize.STRING,
      //     allowNull: false
      // },
      distance: {
        type: Sequelize.FLOAT(20),
        primaryKey: true,
      },
      activitytime: {
        type: Sequelize.FLOAT(20),
        // allowNull: false,
        primaryKey: true,
      },
    },
    { freezeTableName: true }
  );

  return Activity;
};
