const { getResult, getErr } = require("../../services/getResult");
const { selectUser } = require("../../services/baseService/userService");
const  joinUserRoomFn  = require("./joinUserRoom")
const { createFriend } = require("../../services/baseService/friendService");
const { getRoomName } = require("../utils/getRoomName")
async function enquireAddFriend({ targetAccount, info, targetName, title, allow = null }, socket, io) {
    const { name, id: myId, account } = socket.userData;
    if (targetAccount === account) {
        io.to(getRoomName({ type: "one", myId, io }).roomName).emit("backend_error", getErr({ msg: "不能添加自己为好友" }))
        return;
    }
    let targetData = await selectUser(targetAccount, "account");
    if (!targetData) {
        const info = `用户:${targetAccount}不存在`;
        // io.to(`user:${myId}`).emit("enquireAddFriend", getErr({ msg: info }));
        io.to(getRoomName({ type: "one", myId, io }).roomName).emit("backend_error", getErr({ msg: info }));
        return;
    }
    if (allow == null) {
        /* 开始询问 ，这时候的我，是发起好友请求的人*/
        info = info ? info : `我是${name}，还记得我嘛`;
        title = title ? title : `${name}想添加你为好友`;
        io.to(getRoomName({ type: "one", myId: targetData.id, io }).roomName).emit("enquireAddFriend", getResult({ msg: "消息提示", data: { targetData: socket.userData, info, title, name, allow } }));
    } else if (allow === true) {
        /* 允许添加，这时候的我：对方 */
        info = info ? info : `我是${name}，我同意这次好友申请了`
        let tempInfo = `${name}(你)和${targetData.name}已经成为好友了`
        title = title ? title : `好友提示`
        /* 添加为好友 */
        const res = await createFriend({ f_id: myId, s_id: targetData.id });

        /* 两人加入到同个房间 */
        joinUserRoomFn(targetData.id, socket, io);
        /* 通知双方更新socket.userData.friends */
        // const newFriendData = await createFriend({ f_id: myId, s_id: targetData.id })
        // socket.userData.friends = await getFriends(myId);
        // io.to(getRoomName({ type: "friend", myId, targetId: targetData.id, io }).roomName)
        // await getFriendsHandle(true, socket, io);
        /* 通知双方添加成功 */
        io.to(getRoomName({ type: "one", myId, io }).roomName).emit("enquireAddFriend", getResult({ msg: "消息提示", data: { targetData, info: tempInfo, title, name, allow, isFinish: true } }));
        io.to(getRoomName({ type: "one", myId: targetData.id, io }).roomName).emit("enquireAddFriend", getResult({ msg: "消息提示", data: { targetData: socket.userData, info, title, name, allow, isFinish: true } }));
    } else if (allow === false) {
        /* 拒绝添加  这时候的我：对方 */
        info = info ? info : `我是${name}，我不想和你做朋友`;
        title = title ? title : `好友提示`;
        // io.to(`user:${targetData.id}`).emit("enquireAddFriend", getResult({ msg: "消息提示", data: { info, title, name, allow, isFinish: true } }));
        io.to(getRoomName({ type: "one", myId: targetData.id, io }).roomName).emit("enquireAddFriend", getResult({ msg: "消息提示", data: { info, title, name, allow, isFinish: true } }));
    }
}
module.exports = enquireAddFriend;