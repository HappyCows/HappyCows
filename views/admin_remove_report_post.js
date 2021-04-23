const {remove_report} = require("../apis/admin/remove_report");

module.exports = async (req, res) => {
    //console.log(res.locals.user_id)
    await remove_report(
        req.body.reportId,
    );
    res.redirect("/admin/common/"+req.body.cid);
};