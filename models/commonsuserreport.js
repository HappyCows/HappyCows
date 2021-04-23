'use strict';
module.exports = (sequelize, DataTypes) => {
  const CommonsUserReport = sequelize.define('CommonsUserReport', {
    date: DataTypes.DATE
  }, {});
  CommonsUserReport.associate = function(models) {
    models.CommonsUserReport.belongsTo(models.Commons) 
  };
  return CommonsUserReport;
};