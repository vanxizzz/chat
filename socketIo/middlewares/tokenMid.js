const { publish, verify } = require("../../routes/jwt")
module.exports = (socket, io, next) => {
    console.log("????????")
    let userData = verify(null, socket.handshake.headers.authorization);
    console.log(userData)
    if (userData) {
        socket.userData = userData;
        next();
    } else {
        next("token无效");
    }
}