const { sendChattingRecord } = require("../../services/chattingRecord")
const { getRoomName } = require("../utils/getRoomName")
async function sendUserChatting({ targetId, info }, socket, io) {
    console.log("-----------------测试")
    const myId = socket.userData.id;
    let res = await sendChattingRecord({ type: "user", myId, targetId, info });
    if (res.status) {
        /* 发送成功 */
        let roomName = getRoomName({ type: "one", myId, socket, io }).roomName;
        io.to(roomName).emit("getUserChatting", res);
        roomName = getRoomName({ type: "one", myId: targetId, socket, io }).roomName;
        io.to(roomName).emit("getUserChatting", res);
        // let { roomName: targetRoom } =
        console.log("顶顶顶顶顶顶顶顶顶顶")
    }
    // socket.emit("sendUserChatting", res)
}
module.exports = sendUserChatting;