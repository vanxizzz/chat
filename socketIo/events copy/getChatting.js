const { getChatting } = require("../../services/chattingRecord")
const { selectUser } = require("../../services/baseService/userService")
async function getChattingHandler({ type = "user", targetId, limit = 10, page = 1, getAll }, socket, io) {
    const myId = socket.userData.id;
    const res = await getChatting({ type, myId, targetId, limit, page, getAll });

    let arr = [];
    res.data.forEach(item => {
        arr.push(Promise.resolve(selectUser(item.send_id)))
    })
    let sendUserData = await Promise.all(arr);
    res.data = res.data.map((item, index) => {
        return {
            ...item,
            sendUserData: sendUserData[index]
        }
    })
    res.data = {
        type,
        myId,
        targetId,
        limit,
        page,
        data: res.data,
    };
    socket.emit("getChatting", res);
}
exports.getChattingHandler = getChattingHandler;
exports.event = (socket, io) => {
    socket.on("getChatting",  (...args) => {
        args = args.length > 0 ? args : [undefined];
        getChattingHandler(...args, socket, io)
    })
}

// exports.fn =