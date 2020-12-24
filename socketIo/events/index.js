const addFriend = require("./addFriend")
const enquireAddFriend = require("./enquireAddFriend");
const enquireAddGroup = require("./enquireAddGroup");
const getAllChattingRecord = require("./getAllChattingRecord");
const getChattingHandler = require("./getChatting");
const getFriendsHandle = require("./getFriends");
const getGroups = require("./getGroups");
const joinGroupRoomFn = require("./joinGroupRoom");
const joinUserRoomFn = require("./joinUserRoom");
const sendUserChatting = require("./sendUserChatting");
const sendGroupChatting = require("./sendGroupChatting");
const whoami = require("./whoami");
const disconnect = require("./disconnect");
const addGroup = require("./addGroup");
const updateMyInfo = require("./updateMyInfo")

let eventsConfig = [
    {
        eventName: "addGroup",//创建一个群
        fn: addGroup
    },
    {
        eventName: "updateMyInfo",//创建一个群
        fn: updateMyInfo
    },
    {
        eventName: "enquireAddFriend",//询问添加好呀
        fn: enquireAddFriend
    },
    {
        eventName: "enquireAddGroup",
        fn: enquireAddGroup
    },
    {
        eventName: "getAllChattingRecord",
        fn: getAllChattingRecord
    },
    {
        eventName: "getChatting",
        fn: getChattingHandler
    },
    {
        eventName: "getFriends",
        fn: getFriendsHandle
    },
    {
        eventName: "getGroups",
        fn: getGroups
    },
    {
        eventName: "joinGroupRoom",
        fn: joinGroupRoomFn
    },
    {
        eventName: "joinUserRoom",
        fn: joinUserRoomFn
    },
    {
        eventName: "sendUserChatting",
        fn: sendUserChatting
    },
    {
        eventName: "sendGroupChatting",
        fn: sendGroupChatting
    },
    {
        eventName: "whoami",
        fn: whoami
    },
    {
        eventName: "disconnect",
        fn: disconnect
    }
]

module.exports = async (socket, io) => {
    try {
        await (async () => {
            eventsConfig.forEach(item => {
                socket.on(item.eventName, (...args) => {
                    args = args.length > 0 ? args : [undefined];
                    item.fn(...args, socket, io)
                })
            })
        })();
    } catch (error) {
        console.log(error)
        error = error instanceof Error ? error.message : error;
        error = `服务端问题：${error}`;
        socket.emit("backend_error", getErr({ msg: error }));
    }

}