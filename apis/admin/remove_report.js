var db = require("../../models/index")

db.CommonsUserReport.sync();
db.CommonsUserReportItem.sync();

/*
    Delete a report.  Delete all of its detail rows first. 
*/
async function remove_report(reportId){
	
	await db.CommonsUserReportItem.destroy({
		where: {CommonsUserReportId: reportId}
	})
	return await db.CommonsUserReport.destroy({
		where: { id: reportId}
	})
}

module.exports = {remove_report}
