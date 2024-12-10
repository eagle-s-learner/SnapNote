const { DataTypes } = require("sequelize");
const { sequelize } = require("../models");

const cloudinary = require("cloudinary").v2;
const User = require("../models/user")(sequelize, DataTypes);
const streamifier = require("streamifier");
const bcrypt = require("bcrypt");
const EmailVerification = require("../models/emailverification")(
    sequelize,
    DataTypes
);

const saltRound = 10;
const hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(saltRound);
    return bcrypt.hashSync(password, salt);
};

async function confirmAcoountCreation(req, res) {
    let { name, email, password } = req.body;
    try {
        password = hashPassword(password);
        if (!req.file || !req.file.buffer) {
            return res
                .status(400)
                .json({ error: "Profile picture is required" });
        }

        // Create a function to handle the upload
        const uploadToCloudinary = () => {
            return new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    {
                        folder: "profile_pics",
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
        const profilePicUrl = result.secure_url;

        const user = await User.create({
            name,
            email,
            password,
            profilePic: profilePicUrl,
        });

        await EmailVerification.destroy({
            where: {
                email: email,
                isVerified: true,
            },
        });

        res.status(200).json({
            message: "Account created successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create account" });
    }
}

module.exports = confirmAcoountCreation;
