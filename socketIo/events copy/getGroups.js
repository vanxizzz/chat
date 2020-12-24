const { getErr, getResult } = require("../../services/getResult");
const { selectGroup } = require("../../services/baseService/groupService");
async function getGroups(needFetch=false, socket, io) {
    let { groups, id: myId } = socket.userData;
    if (needFetch) {
        groups = await selectGroup(myId)
        socket.userData.groups = groups;
    }
    socket.emit("getGroups", getResult({ msg: "获取群成功", data: groups }));
}
exports.getGroups = getGroups;
exports.event = (socket, io) => {
    socket.on("getGroups",  (...args) => {
        args = args.length > 0 ? args : [undefined];
        getGroups(...args, socket, io);
    })
}
// exports.fn =