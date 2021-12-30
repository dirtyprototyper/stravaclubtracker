module.exports = function (sequelize, Sequelize) {
  const Members = sequelize.define("members", {
    alias: {
      type: Sequelize.STRING,
      // autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },

    points: { type: Sequelize.FLOAT(20), allowNull: true },

    // activitydescription: {
    //     type: Sequelize.STRING,
    //     allowNull: false
    // },
    challenges: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  });

  return Members;
};
