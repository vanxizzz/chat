const { getResult } = require("../../services/getResult")
const { getRoomName } = require("../utils/getRoomName")
async function joinGroupRoomFn(groupId, socket, io) {
    let { roomName, status } = getRoomName({ type: "group", groupId, io });
    socket.join(roomName, () => {
        socket.emit("joinGroupRoom", getResult({ msg: "可以开始群聊了" }));
    })
}
module.exports = joinGroupRoomFn;
