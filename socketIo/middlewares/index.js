const joinRoomMid = require("./joinRoomMid")
const tokenMid = require("./tokenMid")
const initComplete = require("./initComplete")

/* 注意顺序 */
const config = [
    tokenMid,//处理token权限
    joinRoomMid,//处理加入房间
    initComplete//初始化后完成后做一些事情
]

module.exports = (io) => {
    config.forEach(fn => {
        io.use((socket, next) => {
            fn(socket, io, next);
        });
    })
}
