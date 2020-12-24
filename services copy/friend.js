const { selectUser } = require("./baseService/userService");
const UserModel = require("../models/User")
const FriendModel = require("../models/Friend")
const { getErr, getResult } = require("./getResult")
const { selectFriend, deleteFriend } = require("./baseService/friendService");
const { Op } = require("sequelize")
require("../models")
/**
 * 返回结果
 * beFriendTime成为好友的时间，格林威治时间字符串，
 * [{ account, password, name, avatar, id, beFriendTime }]
 * @param {*} myId 
 */
exports.getFriends = async function getFriends(myId) {
    let [res, isExit] = await Promise.all([selectFriend(myId), selectUser(myId)]);
    if (!isExit) {
        /* 检查该用户是否存在 */
        return getErr({ msg: `id为${myId}的用户不存在` })
    }
    let ids = res.map(({ id, f_id, s_id, createdAt, ...item }) => {
        if (f_id === myId) {
            return { id: s_id, createdAt: createdAt };
        } else {
            return { id: f_id, createdAt: createdAt };
        }
    });
    res = await UserModel.findAll({
        where: {
            id: ids.map(item => item.id)
        },
        raw: true,
        order: [
            ["updatedAt", "DESC"]
        ]
    });
    if (res) {
        res = res.map(({ account, password, name, avatar, id }) => {
            const beFriendTime = ids.find(item => item.id === id).createdAt;
            return { id, account, password, name, avatar, beFriendTime }
        })
    }

    // for (let i = 0; i < res.length; i++) {
    //     console.log(res[i].beFriendTime)
    //     console.log(res[i].beFriendTime.toString())
    //     console.log(res[i].beFriendTime.toJSON())
    // };
    return getResult({ msg: "获取朋友成功", data: res })
}

exports.deleteFirend = async (myId, targetId) => {
    return await deleteFriend(myId, targetId);
}
// exports.getFriends(92).then(res => {
//     console.log(res)
// })
// exports.register({account:200,password:2,name:"我的名字",cc:22}).then(res=>{
//     console.log(res)
// })



