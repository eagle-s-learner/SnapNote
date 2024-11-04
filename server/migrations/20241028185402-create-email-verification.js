"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("EmailVerifications", {
            email: {
                type: Sequelize.STRING,
                allowNull: false,
                primaryKey: true,
            },
            verificationCode: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            isVerified: {
                type: Sequelize.BOOLEAN,
            },
            //   createdAt: {
            //     allowNull: false,
            //     type: Sequelize.DATE
            //   },
            //   updatedAt: {
            //     allowNull: false,
            //     type: Sequelize.DATE
            //   }
            modifiedAt: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("EmailVerifications");
    },
};
