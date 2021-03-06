const {get_users_in_common} = require("../apis/admin/user_in_common");
const {get_cow_price,get_max_cow,get_degrade_rate,get_start_date,get_end_date,get_milk_price,get_tax_rate} = require("../apis/admin/common_config");
const {get_avg_cow_health} = require("../apis/admin/commons");
const {get_reports} = require("../apis/admin/commons");
const moment = require('moment');

module.exports = async (req, res) => {
    const cowPrice = await get_cow_price(req.params.commonId);
    const cowMax = await get_max_cow(req.params.commonId);
    const degradeRate = await get_degrade_rate(req.params.commonId);
    const startDate = await get_start_date(req.params.commonId);
    const endDate = await get_end_date(req.params.commonId);
    const milkPrice = await get_milk_price(req.params.commonId);
    const taxPrice = await get_tax_rate(req.params.commonId);
    const cowAvgHealth = await get_avg_cow_health(req.params.commonId);
    const reports = await get_reports(req.params.commonId)

    res.render('admin_commons',
        {data :
            {
                commonId: req.params.commonId,
                cowPrice: cowPrice,
                cowMax: cowMax,
                degradeRate: degradeRate,
                startDate: startDate,
                endDate: endDate,
                milkPrice: milkPrice,
                taxPrice: taxPrice,
                cowAvgHealth: cowAvgHealth,
                reports: reports
            },
        moment: moment,
        dateFormat: "ddd MM/DD/YYYY hh:mm:ssA"
        }
    )
};
