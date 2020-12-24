const { getResult } = require("../../services/getResult")
const { getRoomName } = require("../utils/getRoomName")
function joinGroupRoomFn(groupId, socket, io) {
    let { roomName, status } = getRoomName({ type: "group", groupId, io });
    socket.join(roomName, () => {
        socket.emit("joinGroupRoom", getResult({ msg: "可以开始群聊了" }));
    })
}

exports.event = (socket, io) => {
    socket.on("joinGroupRoom", (groupId) => {
        joinGroupRoomFn(groupId, socket, io);
    })

}
exports.joinGroupRoomFn = joinGroupRoomFn;