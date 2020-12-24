
module.exports = ({ socket, handler, emitName }) => {
    return (...args) => {
        let res = handler(...args);
        if (!res) {
            return false;
        } else if (!res.then) {
            /* 不是promise */
            socket.emit(emitName, { status: 1, data: { ...res } });
        } else {
            res.then(res => {
                socket.emit(emitName, { status: 1, data: { ...res } });
            })
        }
    }

}