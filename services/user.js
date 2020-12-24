const { selectUser, createUser } = require("./baseService/userService");
const UserModel = require("../models/User")
const { getErr, getResult } = require("./getResult")
const md5 = require("md5");
const handleResult = require("../utils/handleResult")
exports.login = async function login({ account, password } = {}) {
    if (!account || !password) {
        return getErr({ msg: "账号或密码其中一个为空" });
    }
    // password = md5(password);
    let res = await UserModel.findOne({
        where: {
            account,
            password
        },
        // raw:true
    });
    if (res && res.toJSON) {
        res = res.toJSON();
    }
    return res ? getResult({ msg: "登录成功", data: res }) : getErr({ msg: "账号或密码输入错误" });//没有则返回null
}
exports.register = async function register({ account, password, name, avatar } = {}) {
    if (account == null || password == null || account === "" || password === "") {
        return getErr({ msg: "账号或密码其中一个为空" });
    }
    if (!avatar) {
        avatar = "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1419569454,2865480665&fm=26&gp=0.jpg";
    }
    // password = md5(password);//加密密码
    let isExit = await UserModel.findOne({
        where: {
            account
        },
        // raw: true
    });
    if (isExit) {
        return getErr({ msg: "该账号已存在" })
    }
    let res = await createUser({
        account,
        password,
        avatar,
        name,
    })
    // let res = await UserModel.create({
    //     account,
    //     password,
    //     avatar,
    //     name,
    // }, { raw: true });
    return getResult({ msg: "注册成功", data: res });
}

// exports.register({account:200,password:2,name:"我的名字",cc:22}).then(res=>{
//     console.log(res)
// })



