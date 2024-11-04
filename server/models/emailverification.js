"use strict";
const { Model } = require("sequelize");
// const { Sequelize } = require(".");
module.exports = (sequelize, DataTypes) => {
    class EmailVerification extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    EmailVerification.init(
        {
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                primaryKey: true,
            },
            verificationCode: { type: DataTypes.STRING, allowNull: false },
            isVerified: { type: DataTypes.BOOLEAN, allowNull: false },
            modifiedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
        },
        {
            sequelize,
            modelName: "EmailVerification",
            timestamps: false,
        }
    );
    return EmailVerification;
};
