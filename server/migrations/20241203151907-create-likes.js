'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Likes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.STRING,
        references: {
            model: "users",
            key: "email",
        },
        onDelete: "CASCADE",
      },
      post_id: {
        type: Sequelize.INTEGER,
        references: {
            model: "posts",
            key: "id"
        },
        onDelete: "CASCADE"
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

    await queryInterface.addConstraint("Likes", {
        fields: ["user_id", "post_id"],
        type: "unique",
        name: "unique_user_post_like"
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Likes');
  }
};