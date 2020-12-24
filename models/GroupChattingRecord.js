const db = require("./db");

const {DataTypes} = require("sequelize");

// 群聊天记录表
//     id
//     send_id发出消息人的id
//     to_group_id群id 
//     创建时间
//     销毁时间
module.exports = db.define(
    "group_chatting_record",
    {
        info: {
            type: DataTypes.TEXT(),
            allowNull:true
        }
    },
    {
        // deletedAt:false,
        // updatedAt:false,
        // paranoid:true
    }
)