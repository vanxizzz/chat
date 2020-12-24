const db = require("./db");

const {DataTypes} = require("sequelize");

// 好友表
//     id
//     f_id 第一个人的id
//     s_id,第二个人的id
module.exports = db.define(
    "friend",
    {
        // fId: {
        //     field: "f_id",
        //     type: DataTypes.STRING(),
        //     allowNull:false,
        // },
        // sId: {
        //     field: "s_id",
        //     type: DataTypes.STRING(),
        //     allowNull:false,
        // },
        // createdAt: {
        //     get(){
        //         let val = this.getDataValue('createdAt');
        //         return val.toString();
        //     }
        // }
    },
    {
        // paranoid:true,
        // deletedAt:false,
        // updatedAt:false
    }
)