const { addFriend } = require("./addFriend")
const { enquireAddFriend } = require("./enquireAddFriend");
const { enquireAddGroup } = require("./enquireAddGroup");
const { getAllChattingRecord } = require("./getAllChattingRecord");
const { getChattingHandler } = require("./getChatting");
const { getFriendsHandle } = require("./getFriends");
const { getGroups } = require("./getGroups");
const { joinGroupRoomFn } = require("./joinGroupRoom");
const { joinUserRoomFn } = require("./joinUserRoom");
const { sendGroupChatting, sendUserChatting } = require("./sendChatting");
const { whoami } = require("./whoami");


let eventsConfig = [
    {
        eventName: "addFriend",
        fn: addFriend
    },
    {
        eventName: "enquireAddFriend",
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
]

module.exports = (socket, io) => {
    eventsConfig.forEach(item => {
        socket.on(item.eventName, (...args) => {
            args = args.length > 0 ? args : [undefined];
            item.fn(...args, socket, io)
        })
    })
}