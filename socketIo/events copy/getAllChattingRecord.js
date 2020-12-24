const { getChatting } = require("../../services/chattingRecord")
const { getErr, getResult } = require("../../services/getResult")
const { getFriends } = require("../../services/friend")
const { selectGroupUser } = require("../../services/baseService/groupUserService")
async function getAllChattingRecord({ limit, page, getAll } = { limit: 10, page: 1, getAll: false }, socket, io) {
    const myId = socket.userData.id;
    const [friendResponse, groups] = await Promise.all([getFriends(myId), selectGroupUser(myId)]);
    const friendAllPromise = friendResponse.data.map(item => {
        return Promise.resolve(getChatting({ type: "user", myId, targetId: item.id, limit, page, getAll }));
    });
    const groupAllPromise = groups.map(item => {
        return Promise.resolve(getChatting({ type: "group", targetId: item.group_id, limit, page, getAll }));
    });
    let [friendChatting, groupChatting] = await Promise.all([Promise.all(friendAllPromise), Promise.all(groupAllPromise)]);
    friendChatting = friendChatting.map((item, index) => {

        let targetId = friendResponse.data[index].id;
        return {
            targetId,
            records: item
        }
    })
    groupChatting = groupChatting.map(item => item.data);
    groupChatting = groupChatting.map((item, index) => {

        let targetId = groups[index].group_id;
        return {
            targetId,
            records: item
        }
    })
    socket.emit("getAllChattingRecord", getResult({ msg: "获取成功", data: { friendChatting, groupChatting } }));

}
exports.getAllChattingRecord = getAllChattingRecord;
exports.event = (socket, io) => {
    socket.on("getAllChattingRecord",  (...args) => {
        args = args.length > 0 ? args : [undefined];
        getAllChattingRecord(...args, socket, io)
    })
}