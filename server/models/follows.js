"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Follows extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Follows.belongsTo(models.User, {
                foreignKey: "followers_email",
                onDelete: "CASCADE"
            })

            Follows.belongsTo(models.User, {
                foreignKey: "following_email",
                onDelete: "CASCADE"
            })
        }
    }
    Follows.init(
        {
            followers_email: { type: DataTypes.STRING, allowNull: false },
            following_email: { type: DataTypes.STRING, allowNull: false },
            is_following: { type: DataTypes.BOOLEAN },
        },
        {
            sequelize,
            modelName: "Follows",
            timestamps: false,
        }
    );
    return Follows;
};
