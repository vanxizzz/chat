const { publish, verify } = require("../jwt")
const { login, register } = require("../../services/user")
const { getErr, getResult } = require("../getResult")
const { selectUser } = require("../../services/baseService/userService")
const { updateUser } = require("../../services/baseService/userService")
const Router = require("express").Router()
const path = require("path")
const fsPromise = require("fs").promises;
const { getUploadImgStoreDatabaseUrl, getUploadImgResponseUrl, UPLOAD_AVATARS_BASE_DIR } = require("../../config")
/* 登录 */
Router.post("/login", async (req, res) => {
    console.log(req.body);
    let { account, password } = req.body;
    let responseData = await login({ account, password });
    if (responseData.status) {
        /* 有效 */
        publish({ res, payload: responseData.data });
    }
    console.log(responseData)
    res.send(responseData);
})
/* 注册 */
Router.post("/", async (req, res) => {
    console.log(req.body);
    let { account, password, name, avatar } = req.body;

    let responseData = await register({ account, password, name, avatar });
    if (responseData.status) {
        /* 无效 */
        // res.send(getErr({ code: 404, msg: responseData.msg }))
        // return;
        publish({ res, payload: responseData.data });
    }
    console.log(res.getHeader("authorization"))
    res.send(responseData);
})
/* 修改信息 */
Router.put("/", async (req, res) => {
    let { name, avatar } = req.body;
    let storeAvatarUrl = avatar;
    if (avatar) {
        /* 上传了图片 */
        let fileName = path.basename(avatar);
        let [tempStr, timestamp, img] = fileName.split("-");
        if (tempStr === "temp") {
            /* 暂时的图片，需要保存正确的图片名称，也就是说只保存img，另外2个不保存 */
            let baseDir = path.resolve(__dirname, "../../", UPLOAD_AVATARS_BASE_DIR);
            // storeAvatarUrl = `public/uploadAvatars/${img}`;
            storeAvatarUrl = getUploadImgStoreDatabaseUrl({ imgName: img });
            await fsPromise.copyFile(path.resolve(baseDir, fileName), path.resolve(baseDir, img));
            await fsPromise.unlink(path.resolve(baseDir, fileName));
        }
    }
    let updateSuccess = await updateUser(req.tokenData.id, { name, avatar: storeAvatarUrl });

    if (!updateSuccess) {
        res.send(getErr({ msg: "更新失败" }))
    } else {
        let userData = await selectUser(req.tokenData.id);
        userData.avatar = getUploadImgResponseUrl({ imgName: path.basename(userData.avatar) });
        publish({ res, payload: userData });
        /* 重新颁发token */

        res.send(getResult({ msg: "更新成功", data: userData }))
    }
})

/* 我是谁? */
Router.post("/whoami", async (req, res) => {
    res.send(getResult({ msg: "获取成功", data: req.tokenData }))
})
module.exports = Router;