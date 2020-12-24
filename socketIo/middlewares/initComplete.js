

module.exports = (socket, io, next) => {
    socket.emit("initComplete");
    next();
}