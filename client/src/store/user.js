import login from "../apis/login";
export default {
    namespaced: true,
    state: {
        isLogin: false,
        info: {
            // id: null,
            // account: "1233",
            // avatar: "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1419569454,2865480665&fm=26&gp=0.jpg",
            // createdAt: "2020-12-17T18:04:52.652Z",
            // name: "1313",
            // password: "333333"
            id: null,
            account: null,
            avatar: null,
            createdAt: null,
            name: null,
            password: null,
            friends: [],
            groups: []
        }
    },
    mutations: {
        login(state, payload) {
            state.info = {
                ...payload,
                friends: [],
                groups: []
            };
            state.isLogin = true;
        },
        initFriends(state, payload) {
            state.info.friends = payload;
        },
        initGroups(state, payload) {
            state.info.groups = payload;
        },

        logout(state, payload) {
            localStorage.removeItem("token");
            state.info = {};
            state.isLogin = false;
        },
        addFriend(state, payload) {
            state.info.friends = [
                payload,
                ...state.info.friends
            ]
        },
        updateMyInfo(state, payload) {
            state.info = {
                ...state.info,
                ...payload
            }
        }
    },
    // actions: {
    //     async login({ commit }, payload) {

    //     }
    // },
}