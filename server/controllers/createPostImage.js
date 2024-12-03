const { DataTypes } = require("sequelize");
const { sequelize } = require("../models");

const Post = require("../models/post")(sequelize, DataTypes);
const User = require("../models/user")(sequelize, DataTypes);

const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

const jsonWebToken = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;

async function createPostImage(req, res) {
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

                // Create a function to handle the upload
                const uploadToCloudinary = () => {
                    return new Promise((resolve, reject) => {
                        const uploadStream = cloudinary.uploader.upload_stream(
                            {
                                folder: "post_image",
                                // width: 48,
                                // height: 48,
                                // crop: "fill",
                            },
                            (error, result) => {
                                if (error) reject(error);
                                else resolve(result);
                            }
                        );

                        // Convert the buffer to a readable stream and pipe it to Cloudinary
                        streamifier
                            .createReadStream(req.file.buffer)
                            .pipe(uploadStream);
                    });
                };

                const result = await uploadToCloudinary();

                const postNew = await Post.create({
                    user_id: userData.dataValues.email,
                    text_content: textPost === "" ? null : textPost,
                    image_url: result.secure_url,
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

module.exports = createPostImage;
