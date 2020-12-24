const { getFriends } = require("../../services/group")
const { getErr, getResult } = require("../../services/getResult");
const { selectGroupUser } = require("../../services/baseService/groupUserService");
const { selectGroup } = require("../../services/baseService/groupService");
function getGroups(needFetch, socket, io) {
    let { groups, id: myId } = socket.userData;
    if (needFetch) {
        groups = await selectGroup(myId)
        socket.userData.groups = groups;
    }
    socket.emit("getGroups", getResult({ msg: "获取群成功", data: groups }));
}
exports.getGroups = getGroups;
exports.event = (socket, io) => {
    socket.on("getGroups", async (needFetch = false) => {
        getGroups(needFetch, socket, io);
    })
}
// exports.fn =