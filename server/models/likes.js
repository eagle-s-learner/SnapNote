"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Likes extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Likes.belongsTo(models.User, {
                foreignKey: "user_id",
                onDelete: "CASCADE",
                targetKey: "email"
            })

            Likes.belongsTo(models.Post, {
                foreignKey: "post_id",
                onDelete: "CASCADE",
                targetKey: "id"
            })
        }
    }
    Likes.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            user_id: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            post_id: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
        },
        {
            sequelize,
            modelName: "Likes",
            timestamps: false,
        }
    );
    return Likes;
};
