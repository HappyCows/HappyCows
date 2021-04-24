const {get_report, get_report_items} = require("../apis/admin/commons");
const moment = require('moment');

module.exports = async (req, res) => {
    const reports = await get_report(req.params.reportId)
    const reportItems = await get_report_items(req.params.reportId)

    res.render('admin_report',
        {data :
            {
                reports: reports,
                reportItems: reportItems
            },
        moment: moment,
        dateFormat: "ddd MM/DD/YYYY hh:mm:ssA"
        }
    )
};
