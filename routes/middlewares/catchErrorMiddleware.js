
const { getErr } = require("../getResult")

module.exports = (error, req, res, next) => {
    let err = error instanceof Error ? error.message : error;
    res.status(500).send(getErr({ code: 500, msg: err }));
}