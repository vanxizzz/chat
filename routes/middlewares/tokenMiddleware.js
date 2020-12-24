const { verify, publish } = require("../jwt")
const { pathToRegexp } = require("path-to-regexp")
const { getErr } = require("../getResult")
const needTokenPath = [
    {
        method: "POST",
        path: "/api/user/whoami"
    },
    {
        method: "PUT",
        path: "/api/user"
    },
    {
        method: "POST",
        path: "/api/avatar"
    },
]

module.exports = (req, res, next) => {
    let temp = needTokenPath.filter(item => {
        let reg = pathToRegexp(item.path);
        return reg.test(req.path) && req.method === item.method;
    })
    if (temp.length === 0) {
        next();
    } else {
        /* 需要token验证 */

        let data = verify(req);
        if (!data) {
            res.status(404).send(getErr({ code: 404, msg: "token无效" }))
            return;
        }
        req.tokenData = data;
        // res.header("authorization", req.headers.authorization);
        next();

    }
}