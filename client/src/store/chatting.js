// import login from "../apis/login";
export default {
    namespaced: true,
    state: {
        curChattingTarget: {
            targetId: null,
            myId: null,
            type: "user",//user或者group
            data: [],
            limit: 10,
            page: 1
        },
        friendChatting: [],
        groupChatting: []
    },
    mutations: {
        initFriendChatting(state, payload) {
            state.friendChatting = payload;
        },
        initGroupChatting(state, payload) {
            state.groupChatting = payload;
        },
        updateCurChattingTarget(state, payload) {
            state.curChattingTarget = {
                ...state.curChattingTarget,
                ...payload
            };
        }
    },
    actions: {
    },
}