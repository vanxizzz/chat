const { createFriend } = require("../../services/baseService/friendService")
const { getFriends } = require("../../services/friend")
const UserModel = require("../../models/User")
const joinUserRoomFn = require("./joinUserRoom")
const { getErr, getResult } = require("../../services/getResult")
const { getRoomName } = require("../utils/getRoomName")
const { createGroup } = require("../../services/baseService/groupService")

async function addGroup({ groupData = {}, inviteTarget = [] }, socket, io) {
    const { name: groupName, avatar: groupAvatar } = groupData;
    const { name: myName, id: myId } = socket.userData;
    const data = await createGroup({
        name: groupName ? groupName : `${myName}创建的群`,
        avatar: groupAvatar
    })
    let oneRoomName = getRoomName({ type: "one", myId, io }).roomName;
    socket.join(oneRoomName);//加入自己的房间
    if (!data) {
        io.to(oneRoomName).emit("backend_error", getErr({ msg: `创建群失败` }));
    } else {
        let groupId = data.id;
        let groupRoomName = getRoomName({ type: "group", groupId, io }).roomName
        socket.join(groupRoomName);//加入群聊房间
        io.to(oneRoomName).emit("backend_success", getResult({ msg: `${myName}(你)创建了一个新群，名字叫：${data.name}` }));
        io.to(oneRoomName).emit("createGroup_success", getResult({ msg: `消息提示`, data: { inviteTarget, groupData: data } }));
    }
}
module.exports = addGroup;
// exports.fn =