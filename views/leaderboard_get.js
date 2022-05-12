const {get_users_in_common} = require("../apis/admin/user_in_common");
const {get_start_date,get_end_date,} = require("../apis/admin/common_config");
const {get_avg_cow_health} = require("../apis/admin/commons");
const moment = require('moment');

module.exports = async (req, res) => {
    const usersInCommon = await get_users_in_common(req, req.params.commonId)
    const sortedUsersInCommon = usersInCommon.sort(byCowsThenWealth);
    const byCowsThenWealth = (userA, userB) => {
        if (userA.cows > userB.cows) {
            return 1;
        }
        else if (userA.cows < userB.cows) {
            return -1;
        }
        else {
            if (userA.wealth > userB.wealth) {
                return 1;
            }
            else if (userA.wealth < userB.wealth) {
                return -1;
            }
            else {
                return 0;
            }
        }
    }

    const startDate = await get_start_date(req.params.commonId);
    const endDate = await get_end_date(req.params.commonId);
    const cowAvgHealth = await get_avg_cow_health(req.params.commonId);

    res.render('leaderboard',
        {data :
            {
                commonId: req.params.commonId,
                users: sortedUsersInCommon,
                startDate: startDate,
                endDate: endDate,
                cowAvgHealth: cowAvgHealth,
            },
        moment: moment,
        dateFormat: "ddd MM/DD/YYYY hh:mm:ssA"
        }
    )
};
