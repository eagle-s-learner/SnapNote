"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Comments extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Comments.belongsTo(models.Post, {
                foreignKey: "post_id",
                targetKey: "id",
                onDelete: "CASCADE",
            });

            Comments.belongsTo(models.User, {
                foreignKey: "commenters_id",
                targetKey: "email",
                onDelete: "CASCADE",
            });
        }
    }
    Comments.init(
        {
            commenters_id: { type: DataTypes.STRING },
            comment_text: { type: DataTypes.STRING, allowNull: false },
            post_id: { type: DataTypes.INTEGER },
        },
        {
            sequelize,
            modelName: "Comments",
            timestamps: false
        }
    );
    return Comments;
};
