

exports.getErr = ({ code = 500, msg = "内部错误" }) => {
    return {
        status: 0,
        code,
        msg,
    }
}
exports.getResult = ({ code = 200, msg = "操作成功", data }) => {
    return {
        status: 1,
        code,
        msg,
        data
    }
}