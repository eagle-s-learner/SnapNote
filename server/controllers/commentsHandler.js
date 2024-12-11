const { sequelize, Sequelize } = require("../models");

async function getComments(req, res) {
    // console.log(req.body.post_id);
    try {
        const comments = await sequelize.query(
            `SELECT 
                comments.id AS comment_id,
                comments.comment_text,
                comments.post_id,
                users.name AS name,
                users.email AS email,
                users.profilePic AS profilePic
            FROM 
                comments
            INNER JOIN 
                users ON comments.commenters_id = users.email
            WHERE 
                comments.post_id = :post_id;`,
            {
                replacements: {
                    post_id: parseInt(req.body.post_id),
                },
                type: Sequelize.QueryTypes.SELECT,
            }
        );

        // console.log(comments);

        res.status(200).json({ comments });
    } catch (error) {
        res.status(error.status).json({ message: error.message });
    }
}

async function postComments(req, res) {
    // console.log(req.body);
    try {
        await sequelize.query(
            `INSERT INTO
                comments (commenters_id, comment_text, post_id)
            VALUES 
                (:userEmail, :comment_text, :post_id);`,
            {
                replacements: {
                    userEmail: req.user.email,
                    comment_text: req.body.comment_text,
                    post_id: parseInt(req.body.post_id),
                },
                type: Sequelize.QueryTypes.INSERT,
            }
        );

        const comments = await sequelize.query(
            `SELECT 
                comments.id AS comment_id,
                comments.comment_text,
                comments.post_id,
                users.name AS name,
                users.email AS email,
                users.profilePic AS profilePic
            FROM 
                comments
            INNER JOIN 
                users ON comments.commenters_id = users.email
            WHERE 
                comments.post_id = :post_id;`,
            {
                replacements: {
                    post_id: parseInt(req.body.post_id),
                },
                type: Sequelize.QueryTypes.SELECT,
            }
        );

        res.status(200).json({ comments });
    } catch (error) {
        res.status(error.status).json({ message: error.message });
    }
}

module.exports = {
    getComments,
    postComments,
};
