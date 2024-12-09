'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Follows', {
    //   id: {
    //     allowNull: false,
    //     autoIncrement: true,
    //     primaryKey: true,
    //     type: Sequelize.INTEGER
    //   },
      followers_email: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
            model: "users",
            key: "email"
        },

        onDelete: "CASCADE"
      },
      following_email: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
            model: "users",
            key: "email"
        },

        onDelete: "CASCADE"
      },
      is_following: {
        type: Sequelize.BOOLEAN
      }
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
    await queryInterface.dropTable('Follows');
  }
};