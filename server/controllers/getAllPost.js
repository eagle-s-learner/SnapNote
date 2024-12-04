const { DataTypes } = require("sequelize");
const { sequelize } = require("../models");

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

                const posts = await Post.findAll({
                    where: { user_id: user.email },
                    order: [["createdAt", "DESC"]],
                    include: [
                        {
                            model: Likes,
                            attributes: ["user_id"]
                        },
                    ],
                });

                console.log(posts)

                // res.status(200).json({ posts });
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
