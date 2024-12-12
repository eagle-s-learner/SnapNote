const { sequelize, Sequelize } = require("../models");
const { DataTypes } = require("sequelize");

async function userLikeAtHomePage(req, res) {
    const { post_id } = req.body;
    try {
        await sequelize.query(
            `INSERT INTO likes (user_id, post_id) VALUES (:user_id, :id)`,
            {
                replacements: { user_id: req.user.email, id: post_id },
                type: Sequelize.QueryTypes.DELETE,
            }
        );

        const posts = await sequelize.query(
            `SELECT 
                posts.id AS post_id,
                posts.user_id AS post_user_id,
                users.name,
                users.profilePic,
                posts.text_content,
                posts.image_url,
                COUNT(DISTINCT likes.id) AS total_likes,
                MAX(CASE WHEN likes.user_id = :userEmail THEN 1 ELSE 0 END) AS user_has_liked,
                COUNT(DISTINCT comments.id) AS total_comments
            FROM 
                posts
            LEFT JOIN 
                likes ON posts.id = likes.post_id
            LEFT JOIN 
                comments ON posts.id = comments.post_id
            LEFT JOIN 
                follows ON posts.user_id = follows.following_email
            LEFT JOIN 
                users ON posts.user_id = users.email
            WHERE 
                posts.user_id = :userEmail OR follows.followers_email = :userEmail AND follows.is_following = true
            GROUP BY 
                posts.id, 
                posts.user_id, 
                users.name, 
                users.email, 
                users.profilePic, 
                posts.text_content, 
                posts.image_url
            ORDER BY 
                posts.createdAt DESC;
            `,
            {
                replacements: { userEmail: req.user.email },
                type: Sequelize.QueryTypes.SELECT,
            }
        );

        // console.log(posts);

        res.status(200).json({ posts });
    } catch (error) {
        // console.log(error);
        res.status(500).json({ message: "Failed to unlike post" });
    }
}

async function userUnlikeAtHomePage(req, res) {
    const { post_id } = req.body;

    try {
        await sequelize.query(
            `DELETE FROM likes WHERE post_id = :id AND user_id = :user_id`,
            {
                replacements: { user_id: req.user.email, id: post_id },
                type: Sequelize.QueryTypes.DELETE,
            }
        );

        const posts = await sequelize.query(
            `SELECT 
                posts.id AS post_id,
                posts.user_id AS post_user_id,
                users.name,
                users.profilePic,
                posts.text_content,
                posts.image_url,
                COUNT(DISTINCT likes.id) AS total_likes,
                MAX(CASE WHEN likes.user_id = :userEmail THEN 1 ELSE 0 END) AS user_has_liked,
                COUNT(DISTINCT comments.id) AS total_comments
            FROM 
                posts
            LEFT JOIN 
                likes ON posts.id = likes.post_id
            LEFT JOIN 
                comments ON posts.id = comments.post_id
            LEFT JOIN 
                follows ON posts.user_id = follows.following_email
            LEFT JOIN 
                users ON posts.user_id = users.email
            WHERE 
                posts.user_id = :userEmail OR follows.followers_email = :userEmail AND follows.is_following = true
            GROUP BY 
                posts.id, 
                posts.user_id, 
                users.name, 
                users.email, 
                users.profilePic, 
                posts.text_content, 
                posts.image_url
            ORDER BY 
                posts.createdAt DESC;
            `,
            {
                replacements: { userEmail: req.user.email },
                type: Sequelize.QueryTypes.SELECT,
            }
        );

        // console.log(posts);

        res.status(200).json({ posts });
    } catch (error) {
        res.status(500).json({ message: "Failed to unlike post" });
    }
}

module.exports = {
    userLikeAtHomePage,
    userUnlikeAtHomePage,
};
