const autoEmit = require("../autoEmit");
const { sendChattingRecord } = require("../../services/chattingRecord")
const { getRoomName } = require("../utils/getRoomName")
async function sendUserChatting({ targetId, info }, socket, io) {
    console.log("-----------------测试")
    const myId = socket.userData.id;
    let res = await sendChattingRecord({ type: "user", myId, targetId, info });
    if (res.status) {
        /* 发送成功 */
        let {roomName} = getRoomName({ type: "friend", myId, targetId,io })
        io.to(roomName).emit("getUserChatting", res);
        console.log("顶顶顶顶顶顶顶顶顶顶")
    }
    socket.emit("sendUserChatting", res)
}

async function sendGroupChatting({ targetId, info }, socket, io) {
    const myId = socket.userData.id;
    let res = await sendChattingRecord({ type: "group", myId, targetId, info });
    if (res.status) {
        /* 发送成功 */
        let {roomName} = getRoomName({ type: "group", groupId: targetId,io });
        io.to(roomName).emit("getGroupChatting", res);
    }
    socket.emit("sendGroupChatting", res)
}
exports.sendUserChatting = sendUserChatting;
exports.sendGroupChatting = sendGroupChatting;
exports.event = (socket, io) => {
    socket.on("sendUserChatting", async ({ targetId, info }) => {
        sendUserChatting({ targetId, info }, socket, io)
    });
    socket.on("sendGroupChatting", async ({ targetId, info }) => {
        sendGroupChatting({ targetId, info }, socket, io)
    })
}