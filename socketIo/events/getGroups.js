const { getErr, getResult } = require("../../services/getResult");
const { selectGroupUser } = require("../../services/baseService/groupUserService")
async function getGroups(needFetch=false, socket, io) {
    let { groups, id: myId } = socket.userData;
    if (needFetch) {
        groups = await selectGroupUser(myId)
        socket.userData.groups = groups;
    }
    socket.emit("getGroups", getResult({ msg: "获取群成功", data: groups }));
}
module.exports = getGroups;