const crypto = require("crypto");
const { sequelize } = require("../models");
const { DataTypes } = require("sequelize");
const sendEmail = require("./emailSentHandlerForEmailVerify");
const User = require("../models/user")(sequelize, DataTypes);
const EmailVerification = require("../models/emailverification")(
    sequelize,
    DataTypes
);

async function emailVerifyHandler(req, res) {
    const { email } = req.body;

    const verificationCode = crypto
        .randomBytes(2)
        .toString("hex")
        .toUpperCase();

    const userUsingSnapnoteAlready = await User.findOne({
        where: { email },
    });

    if (userUsingSnapnoteAlready) {
        console.log("arealdy exist");
        res.status(400).json({ message: "This Email is already In use" });
        return;
    }
    const alreadyExist = await EmailVerification.findOne({
        where: { email },
    });

    if (alreadyExist && alreadyExist.isVerified) {
        res.status(200).json({ message: "Your Email Is Already Verified" });
        return;
    }

    if (alreadyExist) {
        await EmailVerification.update(
            {
                verificationCode: verificationCode,
                modifiedAt: new Date(Date.now()),
            },
            {
                where: {
                    email: email,
                },
            }
        );
        await sendEmail(verificationCode, email);
        res.status(200).json({
            message:
                "Email Verification code has been sent on your given mail ID",
        });
        return;
    }
    try {
        const apple = await EmailVerification.create({
            email,
            verificationCode: verificationCode,
            isVerified: false,
            modifiedAt: new Date(Date.now()),
        });

        await sendEmail(verificationCode, email);
        res.status(200).json({
            message:
                "Email Verification code has been sent on your given mail ID",
        });
        return;
    } catch (error) {
        // console.log(error.message);
        res.json({ error: error.message });
        return;
    }
}

module.exports = emailVerifyHandler;
