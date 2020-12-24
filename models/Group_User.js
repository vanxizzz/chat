const db = require("./db");

const { DataTypes } = require("sequelize");

// 群和用户的表
//     id
//     user_id用户id
//     group_id群id
module.exports = db.define(
    "group_user",
    {
        id: {
            type: DataTypes.INTEGER(),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
    },
    {
        // deletedAt:false,
        // updatedAt:false,
        // paranoid: true
    }
)