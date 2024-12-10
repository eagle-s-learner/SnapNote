const { sequelize, Sequelize } = require("../models");

async function sendRequest(req, res) {
    try {
        await sequelize.query(
            `INSERT INTO
                follows
            VALUES 
                (:userEmail, :wantToFollow, false);`,
            {
                replacements: {
                    userEmail: req.user.email,
                    wantToFollow: req.body.following_email,
                },
                type: Sequelize.QueryTypes.INSERT,
            }
        );

        res.status(200).json({ message: "Request sent successfully" });
    } catch (error) {
        res.status(500).json({ message: "reload page" });
    }
}

module.exports = sendRequest;
