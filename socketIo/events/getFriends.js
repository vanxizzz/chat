const { getFriends } = require("../../services/friend")
const { getErr, getResult } = require("../../services/getResult")

async function getFriendsHandle(needFetch = false, socket, io) {
    let { friends, id: myId } = socket.userData;
    if (needFetch) {
        let { data } = await getFriends(myId);

        socket.userData.friends = friends = data;
    }
    // const resp = await getFriends(myId);
    socket.emit("getFriends", getResult({ msg: "获取朋友成功", data: friends }));
}
module.exports = getFriendsHandle;