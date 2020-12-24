const { getFriends } = require("../../services/friend")
// const {} = require("../../services")
const { selectGroupUser } = require("../../services/baseService/groupUserService")
const joinGroupRoomFn = require("../events/joinGroupRoom");
const joinUserRoomFn = require("../events/joinUserRoom");
const { getResult } = require("../../services/getResult")
const { getRoomName } = require("../utils/getRoomName")
module.exports = async (socket, io, next) => {
    /* 加入群和好友的房间 */
    const myId = socket.userData.id;
    if (!myId) {
        next("错误");
        return;
    }
    /* 自己开辟一个房间 */
    let { roomName } = getRoomName({ type: "one", myId, io });
    socket.join(roomName, () => {
        socket.emit("joinGroupRoom", getResult({ msg: "可以开始群聊了" }));
    })
    try {
        console.log("myIdddddddddddd")
        const [friendResponse, groups] = await Promise.all([getFriends(myId), selectGroupUser(myId)]);
        const friends = friendResponse.data;
        const joinGroupQueue = groups.map(item => {
            return Promise.resolve(joinGroupRoomFn(item.group_id, socket, io))
        })
        const joinUserQueue = friends.map(item => {
            return Promise.resolve(joinUserRoomFn(item.id, socket, io))
        })
        await Promise.all([Promise.all(joinGroupQueue), Promise.all(joinUserQueue)])
        socket.userData.friends = friends;
        socket.userData.groups = groups;
    } catch (error) {
        console.log("错误")
        console.log(error.message)
    } finally {
        next()
    }

}