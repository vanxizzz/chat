import login from "../apis/login";
export default {
    namespaced: true,
    state: {
        friends: [],
        groups: []
    },
    mutations: {
        login(state, payload) {
            state.info = payload;
            state.isLogin = true;
        },
        logout(state, payload) {
            localStorage.removeItem("token");
            state.info = {};
            state.isLogin = false;
        }
    },
    // actions: {
    //     async login({ commit }, payload) {

    //     }
    // },
}