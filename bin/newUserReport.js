#!/usr/bin/env node
require('dotenv').config()

const env = process.env.NODE_ENV || 'development';

var db = require("../models/index")
var { get_wealth, get_cows } = require("../utils/sql")
const { QueryTypes } = require('sequelize');

async function get_list_of_commons() {
	return db.sequelize.query(
		'SELECT * from Commons ',
		{
			type: QueryTypes.SELECT
		}).then((dbRes) => {
			return dbRes;
		}).catch(failureCallback);
}

async function get_users_in_commons_and_make_report(commonId, reportId) {
	console.log(`starting report for commons ${commonId}...`)
	return db.sequelize.query(
		'SELECT u.id, u.firstName, u.lastName, u.email, u.type, ' +
		`(SELECT SUM(wealth) FROM UserWealths WHERE UserId = u.id AND CommonId = ?) AS wealth, ` +
		`(SELECT COUNT(health) FROM Cows WHERE UserId = u.id AND CommonId = ?) AS cows ` +
		'FROM UserCommons AS uc JOIN Users AS u ON u.id = uc.UserId  WHERE uc.CommonId = ? ',
		{
			replacements: [
				commonId, commonId, commonId
			],
			type: QueryTypes.SELECT
		}).then((dbRes) => {
			console.log(`processing ${dbRes.length} rows for commons ${commonId}...`)
			const userReportRows = dbRes
			userReportRows.forEach(async (row) => {
				const newRow = await insertIntoTable(row, reportId);
			});
			return dbRes;
		}).catch(failureCallback);
}

async function insertIntoTable(row, reportId) {
	const newReportRow = await db.CommonsUserReportItem.create({
		wealth: row.wealth,
		cows: row.cows,
		CommonsUserReportId: reportId,
		UserId: row.id
	});
	return newReportRow;
}

function failureCallback(error) {
	console.error("Error: " + error);
}

async function create_new_report(commonsId) {
	const now = new Date();
	const newReport = await db.CommonsUserReport.create({ date: now, CommonId: commonsId })
	return newReport;
}

const main = async () => {
	get_list_of_commons().then( async (result) => {
		result.forEach(async (common) => {
			console.log(`creating report for commons: ${common.id}`)
			create_new_report(common.id).then(async (result) => {
				const reportId = result.dataValues.id;
				get_users_in_commons_and_make_report(common.id, reportId);
			}).catch(failureCallback);
		})
	}).catch(failureCallback)
}

main();


