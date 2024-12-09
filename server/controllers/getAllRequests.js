const jsonWebToken = require("jsonwebtoken");
const { sequelize, Sequelize } = require("../models");

const jwtSecret = process.env.JWT_SECRET;

async function getAllRequests(req, res){
    console.log("req")
    const {token} = req.cookies;

    try{
        if(token){
            jsonWebToken.verify(token, jwtSecret, {}, async (err, user) => {
                if(err) throw err;

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
        // console.log(error)
        res.status(error.status).json({message: "Reload the page..."})
    }
}

module.exports = getAllRequests;