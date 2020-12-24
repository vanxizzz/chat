
/* 
    status: 1  //0表示操作失败，1表示操作成功
    msg: 消息,
    data: 数据
*/
exports.getErr = ({ msg = "操作失败" }) => {
    return {
        status: 0,
        msg,
    }
}
exports.getResult = ({ msg = "操作成功", data = null }) => {
    return {
        status: 1,
        msg,
        data
    }
}