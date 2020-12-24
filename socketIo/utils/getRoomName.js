
/**
 * type可以填one，friend，group
 * 返回的{roomName,status}status为exit是已经存在的，new是新的
 * @param {*} param0 
 * 
 */
function getRoomName({ type = "friend", myId, targetId, groupId, io }) {
    let res = false;
    let status = "exit";
    if (type === "friend") {
        let temp = `friend:${myId} ${targetId}`;
        if (temp in io.adapter.rooms) {
            res = temp;
        } else {
            temp = `friend:${targetId} ${myId}`;
            if (temp in io.adapter.rooms) {
                res = temp;
            }
        }
    } else if (type === "group") {
        let temp = `group:${groupId}`;
        if (temp in io.adapter.rooms) {
            res = temp;
        }
    } else if (type === "one") {
        let temp = `one:${myId}`;
        if (temp in io.adapter.rooms) {
            res = temp;
        }
    }
    if (!res) {
        status = "new"
        res = createRoomName({ type, myId, targetId, groupId })
    }
    return {
        roomName: res,
        status: "old"
    };

}
function createRoomName({ type = "friend", myId, targetId, groupId }) {
    if (type === "friend") {
        return `friend:${myId} ${targetId}`
    } else if (type === "one") {
        return `one:${myId}`
    } else if (type === "group") {
        return `group:${groupId}`
    }
}
exports.getRoomName = getRoomName;
exports.createRoomName = createRoomName

