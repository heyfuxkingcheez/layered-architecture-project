"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Posts extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // 1. Posts 모델에서
            this.belongsTo(models.Users, {
                // 2. Users 모델에게 N:1 관계 설정을 합니다.
                targetKey: "userId", // 3. Users 모델의 userId 컬럼을
                foreignKey: "UserId", // 4. Posts 모델의 UserId 컬럼과 연결합니다.
            });
        }
    }
    Posts.init(
        {
            productid: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            UserId: {
                allowNull: false, // NOT NULL
                type: DataTypes.INTEGER,
                references: {
                    model: "Users", // Users 모델을 참조합니다.
                    key: "userId", // Users 모델의 userId를 참조합니다.
                    onDelete: "CASCADE", // 만약 Posts 모델의 postId가 삭제되면, Comments 모델의 데이터가 삭제됩니다.
                },
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            content: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            status: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: "FOR_SALE",
            },
            price: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            createdAt: {
                allowNull: false, // NOT NULL
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
            updatedAt: {
                allowNull: false, // NOT NULL
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            sequelize,
            modelName: "Posts",
        }
    );
    return Posts;
};
