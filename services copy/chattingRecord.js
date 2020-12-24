const { selectGroupChattingRecord } = require("./baseService/groupChattingService");
const { selectUserChattingRecord } = require("./baseService/userChattingService");
const GroupChattingRecordModel = require("../models/GroupChattingRecord")
const UserChattingRecordModel = require("../models/UserChattingRecord")
const { createUserChattingRecord } = require("./baseService/userChattingService")
const { createGroupChattingRecord } = require("./baseService/groupChattingService")
const { getErr, getResult } = require("./getResult");
const FriendModel = require("../models/Friend");
const { Op } = require("sequelize");
const Group_UserModel = require("../models/Group_User");
require("../models")
/**
 * 判断是否是朋友或群员
 * @param {*} param0 
 */
async function isFriend({ type, myId, targetId }) {
    if (type === "user") {
        let trueFriend = await FriendModel.findOne({
            where: {
                [Op.or]: [
                    {
                        f_id: myId,
                        s_id: targetId
                    },
                    {
                        f_id: targetId,
                        s_id: myId
                    },
                ]
            },
            raw: true
        })
        return trueFriend ? true : false;
    } else if (type === "group") {
        let trueFriend = await Group_UserModel.findOne({
            where: {
                group_id: targetId,
                user_id: myId
            },
            raw: true
        })
        return trueFriend ? true : false;
    }
}
// require("../mock")
/**
 * 获取聊天记录
 * @param {*} type：user或group
 */
exports.getChatting = async ({ type = "user", myId, targetId, limit = 10, page = 1, getAll = false }) => {
    const offset = (page - 1) * limit;
    let res = null;
    if (type === "user") {
        res = await UserChattingRecordModel.findAll({
            where: {
                [Op.or]: [
                    {
                        send_id: myId,
                        to_user_id: targetId
                    },
                    {
                        send_id: targetId,
                        to_user_id: myId
                    },

                ]
            },
            raw: true,
            offset: getAll ? null : offset,
            limit: getAll ? null : limit,
            order: [
                ["createdAt", "ASC"]
            ]
        })
    } else if (type === "group") {
        res = await GroupChattingRecordModel.findAll({
            where: {
                // send_id: myId,
                to_group_id: targetId
            },
            raw: true,
            offset: getAll ? null : offset,
            limit: getAll ? null : limit,
            order: [
                ["createdAt", "ASC"]
            ]
        })
    }
    return getResult({ msg: "获取成功", data: res });
}
/**
 * 给群或好友发送消息
 * @param {*} param0 
 */
exports.sendChattingRecord = async ({ type = "user", myId, targetId, info }) => {
    /* 先判断两人是不是朋友 */
    if (info == undefined) {
        return getErr({ msg: "没有消息内容~" })
    }
    let trueFriend = await isFriend({ type, myId, targetId });
    if (!trueFriend) {
        console.log("不不不是朋友")
        if (type === "user") {
            return getErr({ msg: "你俩不是朋友，不能发送消息" })
        } else {
            return getErr({ msg: "你不是该群群员，不能发送消息" });
        }
    }
    console.log("是朋友了！！！！！！")
    console.log(targetId)
    let res = null;
    if (type === "user") {
        res = await createUserChattingRecord({
            send_id: myId,
            to_user_id: targetId,
            info
        })
    } else if (type === "group") {
        res = await createGroupChattingRecord({
            send_id: myId,
            to_group_id: targetId,
            info
        })
    }
    return getResult({ msg: "发送成功", data: res });
}



// exports.getChatting({
//     type: "user",
//     myId: 1,
//     targetId: 3,
// }).then(res => {
//     console.log(res)
//     for (let i = 0; i < res.count; i++) {
//         console.log(res.rows[i].info)
//     };
// })