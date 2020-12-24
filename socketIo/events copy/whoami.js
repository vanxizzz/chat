const { getResult, getErr } = require("../../services/getResult")

async function whoami(token, socket, io) {
    try {
        let data = verify(null, token);
        socket.emit("whoami", getResult({ msg: "获取成功", data }))

    } catch (error) {
        socket.emit("whoami", getErr({ msg: "token无效" }))
    }
}
exports.whoami = whoami;
exports.event = (socket, io) => {
    socket.on("whoami", (...args) => {
        args = args.length > 0 ? args : [undefined];
        whoami(...args, socket, io);
    });
}