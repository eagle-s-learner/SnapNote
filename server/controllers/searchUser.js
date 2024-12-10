const { sequelize, Sequelize } = require("../models");

async function searchUser(req, res) {
    // console.log(req.user.email);
    // console.log(req.body.username);
    const usernames = await sequelize.query(
        `SELECT
                users.name,
                users.email,
                users.profilePic,
                follows.is_following
            FROM
                users
            LEFT JOIN
                follows
            ON
                users.email = follows.following_email
                AND follows.followers_email = :userEmail
            WHERE
                users.email LIKE :searchTerm AND users.email != :userEmail;`,
        {
            replacements: {userEmail: req.user.email, searchTerm : `${req.body.username}%`},
            type: Sequelize.QueryTypes.SELECT
        }
    )

    if(usernames.length > 0){
        res.status(200).json({usernames})
    }else if((req.user.email).includes(`${req.body.username}`)){
        res.status(299).json({message: "Only you exist with this username"})
    }else{
        res.status(299).json({message: "No user with such username"})
    }
}

module.exports = searchUser;