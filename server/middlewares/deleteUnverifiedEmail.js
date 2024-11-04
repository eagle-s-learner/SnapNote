const cron = require("node-cron");
const { sequelize } = require("../models");
const { DataTypes } = require("sequelize");
const EmailVerification = require('../models/emailverification')(sequelize, DataTypes);
const {Op} = require("sequelize");

cron.schedule('******', () => {
    console.log("Schedule")
})