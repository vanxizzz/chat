const { sendChattingRecord } = require("../../services/chattingRecord")
const { getRoomName } = require("../utils/getRoomName")

async function sendGroupChatting({ targetId, info }, socket, io) {
    const myId = socket.userData.id;
    let res = await sendChattingRecord({ type: "group", myId, targetId, info });
    if (res.status) {
        /* 发送成功 */
        let { roomName } = getRoomName({ type: "group", groupId: targetId, io });
        io.to(roomName).emit("getGroupChatting", res);
    }
    // socket.emit("sendGroupChatting", res)
}
module.exports = sendGroupChatting;