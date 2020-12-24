const { updateUser, selectUser } = require("../../services/baseService/userService");
const { getErr, getResult } = require("../../services/getResult");
module.exports = async (temp, socket, io) => {
    const { id } = socket.userData;
    let newData = await selectUser(id);
    socket.userData = {
        ...socket.userData,
        ...newData
    }
    // socket.emit("initComplete");
    // if (res) {
    //     socket.emit("updateMyInfo_success", getResult({ msg: "更新成功", data: socket.userData }))
    // } else {
    //     socket.emit("backend_error", getErr({ msg: "更新个人信息失败" }))
    // }
}