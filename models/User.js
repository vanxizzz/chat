const db = require("./db");
const { DataTypes } = require("sequelize")
const { UPLOAD_AVATARS_BASE_DIR, getUploadImgResponseUrl } = require("../config")
// 用户表（id,账号，密码，姓名，头像，创建时间，销毁时间）
module.exports = db.define(
    "user",
    {
        account: {
            type: DataTypes.STRING(),
            allowNull: false,

        },
        password: {
            type: DataTypes.STRING(),
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(),
            allowNull: true,
            defaultValue: "",
        },
        avatar: {
            type: DataTypes.STRING,
            allowNull: true,
            // defaultValue: "",
            get() {
                console.log("测水水水水水水水水水水水水")
                let avatar = this.getDataValue('avatar');
                if (avatar) {
                    if (avatar.startsWith("http://") || avatar.startsWith("https://")) {
                        /* 绝对路径，直接返回 */
                        return avatar;
                    }
                    let newReg = new RegExp(UPLOAD_AVATARS_BASE_DIR);
                    avatar = avatar.replace(newReg, "");
                    avatar = getUploadImgResponseUrl({ imgName: avatar })
                    console.log("geeeeeee")
                    console.log(avatar)
                }
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