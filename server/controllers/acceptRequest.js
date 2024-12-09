const jsonWebToken = require("jsonwebtoken");
const { sequelize, Sequelize } = require("../models");

const jwtSecret = process.env.JWT_SECRET;

async function acceptRequest(req, res) {
    const {token} = req.cookies;
    try{
        if(token){
            jsonWebToken.verify(token, jwtSecret, {}, async (err, user) => {
                if(err) throw err;

                await sequelize.query(
                    `UPDATE
                        follows
                    SET
                        is_following = true
                    WHERE
                        followers_email = :senderEmail
                        AND following_email = :userEmail
                        AND is_following = false`,
                    {
                        replacements: {senderEmail: req.body.follower_email,
                            userEmail: user.email
                        },
                        type: Sequelize.QueryTypes.UPDATE
                    }
                )

                const requests = await sequelize.query(
                    `SELECT
                        users.name as name,
                        users.profilePic,
                        follows.followers_email
                    FROM
                        users  
                    LEFT JOIN
                        follows
                    ON
                        users.email = follows.following_email
                    WHERE
                        follows.following_email = :userEmail AND follows.is_following = false;`,
                    {
                        replacements: {userEmail: user.email},
                        type: Sequelize.QueryTypes.SELECT,
                    }
                )

                // console.log(requests);
                res.status(200).json({requests})
            })
        }else{
            res.status(401).json({message: "Unauthorized"})
        }
    }catch(error){
        // console.log(error);
        res.status(error.status).json({message: "Reload the page..."})
    }
}

module.exports = acceptRequest;