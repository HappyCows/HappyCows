const {cost_per_cow_update} = require("../apis/admin/common_config");

module.exports = async (req, res) => {
    console.log(res.locals.user_id)
    await cost_per_cow_update(
        req.body.cid,
        res.locals.user.id
    );
    res.redirect("/admin/common/"+req.body.cid);
};