"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            User.hasMany(models.Post, {
                foreignKey: "user_id",
                onDelete: "CASCADE"
            })

            User.hasMany(models.Likes, {
                foreignKey: "user_id",
                sourceKey: "email"
            })

            User.hasMany(models.Follows, {
                foreignKey: "following_email",
                sourceKey: "email"
            })

            User.hasMany(models.Follows, {
                foreignKey: "followers_email",
                sourceKey: "email"
            })

            User.hasMany(models.Comments, {
                foreignKey: "commenters_id",
                sourceKey: "email"
            })
        }
    }
    User.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                primaryKey: true,
                allowNull: false,
            },
            password: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            profilePic: {
                type: DataTypes.TEXT,
            },
        },
        {
            sequelize,
            modelName: "User",
            timestamps: false,
        }
    );
    return User;
};
