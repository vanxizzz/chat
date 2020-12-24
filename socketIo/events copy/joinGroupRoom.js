const { getResult } = require("../../services/getResult")
const { getRoomName } = require("../utils/getRoomName")
async function joinGroupRoomFn(groupId, socket, io) {
    let { roomName, status } = getRoomName({ type: "group", groupId, io });
    socket.join(roomName, () => {
        socket.emit("joinGroupRoom", getResult({ msg: "可以开始群聊了" }));
    })
}
exports.joinGroupRoomFn = joinGroupRoomFn;
exports.event = (socket, io) => {
    socket.on("joinGroupRoom", (...args) => {
        args = args.length > 0 ? args : [undefined];
        joinGroupRoomFn(...args, socket, io);
    })

}
