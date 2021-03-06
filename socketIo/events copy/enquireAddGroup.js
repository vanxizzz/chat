const { getResult, getErr } = require("../../services/getResult");
const { selectUser } = require("../../services/baseService/userService");
const { getRoomName } = require("../utils/getRoomName");
const { createGroupUser } = require("../../services/baseService/groupUserService")
const { selectGroup, createGroup } = require("../../services/baseService/groupService")
async function enquireAddGroup({ targetId, targetGroupData = {}, newGroup = false, allow = null }, socket, io) {
    // if (!targetData) {
    //     const info = `用户:${targetAccount}不存在`;
    //     // io.to(`user:${myId}`).emit("enquireAddGroup", getErr({ msg: info }));
    //     io.to(getRoomName({ type: "one", myId, io }).roomName).emit("enquireAddGroup", getErr({ msg: info }));
    //     return;
    // }
    const { id: myId, name } = socket.userData;
    let { id: groupId, name: groupName, avatar: groupAvatar } = targetGroupData;
    /* 是新群的话先创建 */
    if (newGroup) {
        const data = await createGroup({
            name: groupName ? groupName : `${name}创建的群`,
            avatar: groupAvatar
        })
        groupId = data.id;
        if (data) {
            io.to(getRoomName({ type: "one", myId, io }).roomName).emit("backend_success", getResult({ msg: `${myId}(你)创建了一个新群，名字叫：${data.name}` }));
        }
    }
    let [targetData, groupData] = await Promise.all([selectUser(targetId, "id"), selectGroup(groupId)]);
    /*  */
    if (!targetData) {
        io.to(getRoomName({ type: "one", myId, io }).roomName).emit("backend_error", getErr({ msg: `id为${targetId}的用户不存在` }));
        return;
    }
    if (!groupData) {
        io.to(getRoomName({ type: "one", myId, io }).roomName).emit("backend_error", getErr({ msg: `id为${groupId}的群不存在` }));
        return;
    }
    /* 走到这，说明用户和群是有效的，可以在数据库中找到 */
    if (allow == null) {
        /* 我发起的请求 */
        let res = await createGroupUser({ group_id: groupId, user_id: targetId });
        let groupRoomName = getRoomName({ type: "group", groupId, io }).roomName;
        socket.join(groupRoomName);//加入群聊房间
        let info = `${name}(我)加入群成功`;
        io.to(getRoomName({ type: "one", myId, io }).roomName).emit("enquireAddGroup", getResult({ msg: `消息提示`, data: { info, isFinish: true } }));
        info = `${name}邀请你加入`;
        io.to(getRoomName({ type: "one", myId: targetData.id, io }).roomName).emit("enquireAddGroup", getResult({ msg: `消息提示`, data: { userData: socket.userData, groupData, info } }));
    } else if (allow === true) {
        /* 允许添加，这时候的我：对方 */
        /* 加入群 */
        let res = await createGroupUser({ group_id: groupId, user_id: myId });
        /* 加入成功 */
        if (res) {
            /* 加入群聊房间 */
            let groupRoomName = getRoomName({ type: "group", groupId, io }).roomName;
            socket.join(groupRoomName);
            /* 通知自己加入成功 */
            let info = `成功加入${targetData.name}邀请${name}(你)的群${groupData.name}`;
            let tempRoomName = getRoomName({ type: "one", myId, io }).roomName;
            io.to(tempRoomName).emit("enquireAddGroup", getResult({ msg: "消息提示", data: { info, isFinish: true } }));
            /* 通知对方（最开始邀请你的人） */
            tempRoomName = getRoomName({ type: "one", myId: targetData.id, io }).roomName;
            info = `我是${name}，我同意加入${targetData.name}(你)的群邀请`
            io.to(tempRoomName).emit("enquireAddGroup", getResult({ msg: "消息提示", data: { info, isFinish: true } }))
        } else {
            let tempRoomName = getRoomName({ type: "one", myId, io }).roomName;
            io.to(tempRoomName).emit("backend_error", getErr({ msg: `${name}(你)已经是群员了` }));
        }
    } else if (allow === false) {
        /* 拒绝添加  这时候的我：对方 */
        /* 通知对方（最开始邀请你的人），我拒绝添加 */
        let tempRoomName = getRoomName({ type: "one", myId: targetData.id, io }).roomName;
        let info = `我是${name}，我拒绝加入${targetData.name}(你)的群邀请`
        io.to(tempRoomName).emit("enquireAddGroup", getResult({ msg: "消息提示", data: { info, isFinish: true } }))
    }
}
exports.enquireAddGroup = enquireAddGroup;
exports.event = (socket, io) => {
    socket.on("enquireAddGroup",  (...args) => {
        args = args.length > 0 ? args : [undefined];
        enquireAddGroup(...args, socket, io);
    })
}