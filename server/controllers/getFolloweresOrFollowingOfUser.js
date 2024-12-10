const jsonWebToken = require("jsonwebtoken");
const { Sequelize, sequelize } = require("../models");

const jwtSecret = process.env.JWT_SECRET;

async function userFollowers(req, res) {
    const { token } = req.cookies;
    try {
        if (token) {
            jsonWebToken.verify(token, jwtSecret, {}, async (err, user) => {
                if (err) throw err;

                const lists = await sequelize.query(
                    `SELECT
                            users.name as name, users.email, users.profilePic
                        FROM
                            users
                        LEFT JOIN
                            follows
                        ON
                            users.email = follows.followers_email
                        WHERE
                            follows.following_email = :userEmail AND is_following = true;`,
                    {
                        replacements: { userEmail: user.email },
                        type: Sequelize.QueryTypes.SELECT,
                    }
                );

                // console.log(requests);
                res.status(200).json({ lists });
            });
        } else {
            res.status(401).json({ message: "Unauthorized" });
        }
    } catch (error) {
        // console.log(error);
        res.status(error.status).json({ message: "Reload the page..." });
    }
}

async function userFollowing(req, res) {
    const { token } = req.cookies;
    try {
        if (token) {
            jsonWebToken.verify(token, jwtSecret, {}, async (err, user) => {
                if (err) throw err;

                const lists = await sequelize.query(
                    `SELECT
                            users.name as name, users.email, users.profilePic
                        FROM
                            users
                        LEFT JOIN
                            follows
                        ON
                            users.email = follows.following_email
                        WHERE
                            follows.followers_email = :userEmail AND is_following = true;`,
                    {
                        replacements: { userEmail: user.email },
                        type: Sequelize.QueryTypes.SELECT,
                    }
                );

                // console.log(requests);
                res.status(200).json({ lists });
            });
        } else {
            res.status(401).json({ message: "Unauthorized" });
        }
    } catch (error) {
        // console.log(error);
        res.status(error.status).json({ message: "Reload the page..." });
    }
}

module.exports = {
    userFollowers,
    userFollowing,
};
