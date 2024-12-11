const { DataTypes } = require("sequelize");
const { sequelize, Sequelize } = require("../models");

const Post = require("../models/post")(sequelize, DataTypes);
const User = require("../models/user")(sequelize, DataTypes);
const Likes = require("../models/likes")(sequelize, DataTypes);

const jsonWebToken = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;

async function getAllPost(req, res) {
    const { token } = req.cookies;
    try {
        if (token) {
            jsonWebToken.verify(token, jwtSecret, {}, async (err, user) => {
                if (err) {
                    throw err;
                }

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
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to fetch posts" });
    }
}

//
// } catch (error) {
//     console.error("Error fetching posts:", error);
//
// }
module.exports = getAllPost;
