const db = require("./db");

const { DataTypes } = require("sequelize");

// 聊天记录表
//     id
//     send_id发出消息人的id
//     to_user_id对方的id（有可能是群表id，也有可能是好友(用户)id，具体看type值）
//     info: 聊天信息（富文本）
//     创建时间
//     销毁时间
module.exports = db.define(
    "user_chatting_record",
    {
        info: {
            type: DataTypes.TEXT(),
            allowNull: true
        },
    },
    {
        // deletedAt:false,
        // updatedAt:false,
        // paranoid:true
    }
)