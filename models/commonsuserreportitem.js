'use strict';
module.exports = (sequelize, DataTypes) => {
  const CommonsUserReportItem = sequelize.define('CommonsUserReportItem', {
    wealth: DataTypes.INTEGER,
    cows: DataTypes.INTEGER
  }, {});
  CommonsUserReportItem.associate = function(models) {
    models.CommonsUserReportItem.belongsTo(models.CommonsUserReport) 
    models.CommonsUserReportItem.belongsTo(models.Commons), {through: models.CommonsUserReport}
    models.CommonsUserReportItem.belongsTo(models.Users) 
  };
  return CommonsUserReportItem;
};