// const { text } = require("express");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config()

const password = process.env.EMAIL_PASSWORD;

const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: "gmail",
    port: 587,
    secure: false,
    auth: {
        user: "eagle.sam.eye00@gmail.com",
        pass: password,
    },
});

async function sendEmail(verificationCode, clientMail) {
    try {
        const info = await transport.sendMail({
            from: "eagle.sam.eye00@gmail.com",
            to: `${clientMail}`,
            subject: "Mail Verification Code",
            text: "Join SnapNote Today...",
            html: `<p>Your Mail Verification Code is: <strong>${verificationCode}</strong> <p>`,
        });
    } catch (error) {
        // console.log("inside mail sender function");
        console.log(error.message);
    }
}

module.exports = sendEmail;
