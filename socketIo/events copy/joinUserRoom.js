const { getResult } = require("../../services/getResult")
const { getRoomName } = require("../utils/getRoomName")
async function joinUserRoomFn(targetId, socket, io) {
    const myId = socket.userData.id;
    let { roomName } = getRoomName({ type: "friend", myId, targetId, io });
    socket.join(roomName, () => {
        console.log(`${myId}和${targetId}在一个房间`);
        socket.emit("joinUserRoom", getResult({ msg: `用户${myId}和${targetId}在一个房间` }));
    })
}
exports.joinUserRoomFn = joinUserRoomFn;
exports.event = (socket, io) => {
    socket.on("joinUserRoom", (...args) => {
        args = args.length > 0 ? args : [undefined];
        joinUserRoomFn(...args, socket, io);
    })
}