let online = require("./Online");

const autoEmit = require("./autoEmit");
const { getErr } = require("../services/getResult");
module.exports = (IO) => {
    // console.log("!!!!!!")
    const io = IO.of("/api/socket");
    // const io = IO;
    io.on('connection', socket => {
        // socket.join(roomName,()=>{
        //     console.log(socket.rooms)
        // })  
        //处理token的中间件
        try {
            console.log("进来了")
            require("./middlewares")(io)
            // io.use(require("./middlewares/tokenMid"));
            // //处理加入房间的中间件
            // io.use((socket, next) => {
            //     require("./middlewares/joinRoomMid")(io, socket, next)
            // })
            // io.use((socket, next) => {
            //     socket.emit("initComplete");
            //     console.log("^^^^^^^^^^^^^^^^^^")
            //     next();
            // })
            require("./events")(socket, io);

            // socket.disconnect
        } catch (error) {
            /* 错误处理 */
            console.log(error)
            error = error instanceof Error ? error.message : error;
            error = `服务端问题：${error}`;
            socket.emit("backend_error", getErr({ msg: error }));
        }

    });


}