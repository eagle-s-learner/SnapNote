const { sequelize, Sequelize } = require("../models");

async function removeFollower(req, res) {
    try {
        await sequelize.query(
            `DELETE FROM
                follows
            WHERE followers_email = :fEmail AND following_email = :userEmail AND is_following = true;`,
            {
                replacements: {
                    fEmail: req.body.followers_email,
                    userEmail: req.user.email,
                },
                type: Sequelize.QueryTypes.DELETE,
            }
        );

        res.status(200).json({message: "Removed Successfully"})
    } catch (error) {
        res.status(error.status).json({ message: error.message });
    }
}

async function removeFollowing(req, res) {
    try {
        await sequelize.query(
            `DELETE FROM
                follows
            WHERE following_email = :fEmail AND followers_email = :userEmail AND is_following = true;`,
            {
                replacements: {
                    fEmail: req.body.following_email,
                    userEmail: req.user.email,
                },
                type: Sequelize.QueryTypes.DELETE,
            }
        );

        res.status(200).json({message: "Removed Successfully"})
    } catch (error) {
        res.status(error.status).json({ message: error.message });
    }
}

module.exports = {
    removeFollower,
    removeFollowing,
};
