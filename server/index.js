const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;
const loginHandler = require("./routes/loginHandler");
const emailverify = require("./routes/emailverify");
const cookieParser = require("cookie-parser");
const getUserProfileIfCookieSet = require("./routes/getUserProfileIfCookieSet");
const logoutHandler = require("./routes/logoutHandler");
const createPost = require("./routes/createPost");
const getAllPost = require("./routes/getAllPost");

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

const confirmAccountCreation = require("./routes/accountCreation")

const PORT = process.env.PORT;

const app = express();
app.use(cookieParser());
app.use(
    cors({
        credentials: true,
        origin: "http://localhost:5173",
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("uploads"));

app.use("/api", emailverify);
// app.use("/api", emailverify);
app.use("/api", confirmAccountCreation);
app.use("/api", loginHandler);

app.use("/api", getUserProfileIfCookieSet);


app.use("/api", logoutHandler)

app.use("/api", createPost);
app.use("/api", getAllPost);
// app.get('/', (req, res) => {
//     res.end(`<img src="http://localhost:3020/1729769876566.jpg"/>`);
// })

const port1 = PORT || 3021;

app.listen(port1, () => {
    console.log(`Server is running on ${port1}`);
    // console.log(process.argv);
});
