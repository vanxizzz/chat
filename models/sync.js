
const db = require("./db");

db.sync({ alter: true }).then(() => {
    console.log("所有模型同步完成");
}).then(() => {
    // const {} = require("../services/baseService/groupChattingService")
    // const { login } = require("../services/user");
    return;
    return Promise.all([
        // createUser({ account: "a", password: "11" }),
        // createUser({ account: "b", password: "22" }),
        // deleteFriend(1, 3)
        // createGroup({
        //     name:"一群"
        // }),
        // createGroup({
        //     name:"二群"
        // }),
        // createGroup({
        //     name:"三群"
        // })
        // deleteGroup(1909)
        login({ account: 12, password: 1 })
    ])
}).then(res => {
    console.log(res);
})