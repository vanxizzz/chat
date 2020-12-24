const { createFriend } = require("./baseService/friendService")
const { createUser } = require("./userService")

Promise.all([
    // createUser({ account: "a", password: "11" }),
    // createUser({ account: "b", password: "22" }),
    // createFriend({
    //     f_id: 0,
    //     s_id: 1
    // }),
    // createFriend({
    //     f_id: 0,
    //     s_id: 2
    // }),
    // createFriend({
    //     f_id: 0,
    //     s_id: 3
    // }),
    // createFriend({
    //     f_id: 0,
    //     s_id: 4
    // }),
    // createFriend({
    //     f_id: 0,
    //     s_id: 5
    // }),
]).then(res => {
    console.log(res)
})