const jwt = require("jsonwebtoken");
const privateKey = "我的密钥";
exports.publish = ({ res, payload, signOptions = { expiresIn: 60 * 60 } }) => {
    let token = jwt.sign(payload, privateKey, signOptions);
    // console.log("?????????")
    if (res) {
        res.header("authorization", token);

    } else {
        return token;
    }
    // console.log(res.getHeader)
}
exports.verify = (req, authorization) => {
    let token;
    if (req) {
        token = req.headers.authorization
    } else {
        token = authorization;
    }
    try {
        return jwt.verify(token, privateKey);
    } catch (error) {
        return null;
    }
}
// let re = exports.publish({ payload: { a: 555, b: 666 } })
// console.log(exports.verify(re))
// setTimeout(() => {
//     console.log(exports.verify(re))

// }, 4000);