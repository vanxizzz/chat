const { createFriend } = require("../../services/baseService/friendService")
const { getFriends } = require("../../services/friend")
const UserModel = require("../../models/User")
const { joinUserRoomFn } = require("./joinUserRoom")
const { getErr, getResult } = require("../../services/getResult")
const {getRoomName} = require("../utils/getRoomName")
module.exports = (socket, io) => {
    socket.on("addFriend", async ({ myId, targetAccount }) => {
        let data = await UserModel.findOne({ where: { account: targetAccount }, raw: true })
        if (!data) {
            socket.emit("addFriend", getErr({ msg: "该account用户不存在" }))
            return;
        }
        /* 添加为好友 */
        let res = await createFriend({ f_id: myId, s_id: data.id });
        if (!res) {
            socket.emit("addFriend", getErr({ msg: "结交失败~" }));
            return;
        }
        const friendsResponse = await getFriends(myId);
        socket.userData.friends = friendsResponse.data;
        /* 加入房间 */
        joinUserRoomFn(data.id, socket, io);
        // io.to(room).emit(`user:${data.id}`, getResult({ msg: `${data.name}想添加你为好友`, data }));
        socket.emit("addFriend", getResult({ msg: "结交成功", data: friendsResponse.data.find(item => item.account === targetAccount) }));
        // socket.emit("getNewFriend", getResult({ msg: "获取新朋友成功", data: friendsResponse.data.find(item => item.account === targetAccount) }))
    })
}
// exports.fn =