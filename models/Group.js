const db = require("./db");

const { DataTypes } = require("sequelize");
const { getUploadImgResponseUrl, STATIC_PATH_RELATIVE } = require("../config")
// 群表
//     id
//     name群名
module.exports = db.define(
    "group",
    {
        // groupOneId: {
        //     field: "group_one_id",
        //     type: DataTypes.STRING(),
        //     allowNull:false,
        // },
        name: {
            type: DataTypes.STRING(),
            allowNull: false
        },
        avatar: {
            type: DataTypes.STRING(),
            allowNull: true,
            defaultValue: "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=969251877,926465634&fm=26&gp=0.jpg",
            get() {
                let avatar = this.getDataValue('avatar');
                if (avatar.startsWith("http://") || avatar.startsWith("https://")) {
                    /* 绝对路径，直接返回 */
                    return avatar;
                }
                let newReg = new RegExp(STATIC_PATH_RELATIVE);
                avatar = avatar.replace(newReg, "");
                avatar = getUploadImgResponseUrl({ imgName: avatar })
                return avatar;
            },
            set(val) {
                this.setDataValue('avatar', val);
            }
        },
    },
    {
        // deletedAt:false,
        // updatedAt:false,
        // paranoid: true
    }
)