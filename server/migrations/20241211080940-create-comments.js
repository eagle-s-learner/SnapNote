"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Comments", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            commenters_id: {
                type: Sequelize.STRING,
                references: {
                    model: "users",
                    key: "email",
                },
                onDelete: "CASCADE",
            },
            comment_text: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            post_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: "posts",
                    key: "id",
                },
                onDelete: "CASCADE",
            },
            //   createdAt: {
            //     allowNull: false,
            //     type: Sequelize.DATE
            //   },
            //   updatedAt: {
            //     allowNull: false,
            //     type: Sequelize.DATE
            //   }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("Comments");
    },
};
