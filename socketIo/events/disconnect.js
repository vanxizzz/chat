

module.exports = (temp, socket, io) => {
    console.log("前端那边断开了")
    socket.disconnect();
    socket.leaveAll()
}