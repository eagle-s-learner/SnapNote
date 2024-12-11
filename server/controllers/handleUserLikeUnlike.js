const jsonwebtoken = require("jsonwebtoken");
const { sequelize, Sequelize } = require("../models");
const { DataTypes } = require("sequelize");
const Likes = require("../models/likes")(sequelize, DataTypes);

const jwtSecret = process.env.JWT_SECRET;

async function userLike(req, res) {
    console.log("user like");
    const { token } = req.cookies;
    const { user_id, post_id } = req.body;

    try {
        if (token) {
            jsonwebtoken.verify(token, jwtSecret, {}, async (err, user) => {
                if (err) throw err;

                await sequelize.query(
                    `INSERT INTO likes (user_id, post_id) VALUES (:user_id, :id)`,
                    {
                        replacements: { user_id: user_id, id: post_id },
                        type: Sequelize.QueryTypes.DELETE,
                    }
                );

                const posts = await sequelize.query(
                    `SELECT 
                        posts.id AS post_id,
                        posts.user_id AS post_user_id,
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
                    WHERE 
                        posts.user_id = :userEmail
                    GROUP BY 
                        posts.id, posts.user_id, posts.text_content, posts.image_url
                    ORDER BY 
                        posts.createdAt DESC;
                    `,
                    {
                        replacements: { userEmail: user.email },
                        type: Sequelize.QueryTypes.SELECT,
                    }
                );

                // console.log(posts);

                res.status(200).json({ posts });
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to unlike post" });
    }
}

async function userUnlike(req, res) {
    // console.log("user unlike");
    const { token } = req.cookies;
    const { user_id, post_id } = req.body;

    try {
        if (token) {
            jsonwebtoken.verify(token, jwtSecret, {}, async (err, user) => {
                if (err) throw err;

                await sequelize.query(
                    `DELETE FROM likes WHERE post_id = :id AND user_id = :user_id`,
                    {
                        replacements: { user_id: user_id, id: post_id },
                        type: Sequelize.QueryTypes.DELETE,
                    }
                );

                const posts = await sequelize.query(
                    `SELECT 
                        posts.id AS post_id,
                        posts.user_id AS post_user_id,
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
                    WHERE 
                        posts.user_id = :userEmail
                    GROUP BY 
                        posts.id, posts.user_id, posts.text_content, posts.image_url
                    ORDER BY 
                        posts.createdAt DESC;
                    `,
                    {
                        replacements: { userEmail: user.email },
                        type: Sequelize.QueryTypes.SELECT,
                    }
                );

                // console.log(posts);

                res.status(200).json({ posts });
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to unlike post" });
    }
    // console.log(user_id, post_id)
}

module.exports = {
    userLike,
    userUnlike,
};
