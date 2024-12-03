const { DataTypes } = require("sequelize");
const { sequelize } = require("../models");

const Post = require("../models/post")(sequelize, DataTypes);
const User = require("../models/user")(sequelize, DataTypes);

const jsonWebToken = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;

async function createPostText(req, res) {
    const { textPost } = req.body;
    const { token } = req.cookies;

    try {
        if (token) {
            jsonWebToken.verify(token, jwtSecret, {}, async (error, user) => {
                if (error) {
                    throw error;
                }

                const userData = await User.findOne({
                    where: {
                        email: user.email,
                    },
                });

                const postNew = await Post.create({
                    user_id: userData.dataValues.email,
                    text_content: textPost,
                    image_url: null,
                    createAt: new Date(Date.now()),
                });

                // console.log(userData.dataValues);
                // console.log(postNew);
            });
            res.status(200).json({ message: "Posted successfully..." });
        } else {
            res.status(404).json({ message: "Plase, login.." });
        }
    } catch (error) {
        // console.log(error);
        res.status(500).json({ message: error.message });
    }
}

module.exports = createPostText;
