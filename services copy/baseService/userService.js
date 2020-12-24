const UserModel = require("../../models/User")
const md5 = require("md5");
const handleResult = require("../../utils/handleResult")
/* 
    {
        account: "",账号
        password:"",密码
        name: ""名称,
        avatar: ""头像
    }
*/
require("../../models")
async function createUser(infoObj = {}) {
    infoObj = {
        ...infoObj,
        // password: md5(infoObj.password)
        password: infoObj.password
    }
    let res = await UserModel.create(infoObj, { raw: true });
    return res.toJSON();
}
async function selectUser(id, type = "id") {
    let res = await UserModel.findOne({
        where: {
            [type]: id
        },
        // raw: true
    });
    console.log(res)
    return res.toJSON();
}
async function updateUser(id, infoObj) {
    return await UserModel.update(infoObj, {
        where: {
            id
        },
    });
}
async function deleteUser(id) {
    return await UserModel.destroy({
        where: {
            id
        },
    });
};
exports.createUser = handleResult(createUser);
exports.selectUser = handleResult(selectUser);
exports.updateUser = handleResult(updateUser);
exports.deleteUser = handleResult(deleteUser);

exports.selectUser(999999).then(res=>{
    console.log(res)
})
