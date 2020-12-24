const express = require("express");
// const http = require('http');
const SOCKET_IO = require('socket.io');
const intervalClearTempImg = require("./intervalClearTempImg")
const path = require("path")
const { PORT } = require("./config");
const fs = require("fs")
const https = require("https");
const httpsOption = {
    key: fs.readFileSync(path.resolve("./certs/3_zyxin.top.key")),
    cert: fs.readFileSync(path.resolve("./certs/2_zyxin.top.crt")),
}
require("./models");
intervalClearTempImg({
    targetDir: path.resolve(__dirname, "./public/uploadAvatars"),
    limitTime: 15 * 60,
    intervalTime: 60 * 60
});

const app = express();
const httpsServer = https.createServer(httpsOption, app);
require("./routes")(app);
const IO = SOCKET_IO(httpsServer);
require("./socketIo")(IO);
httpsServer.listen(PORT);
// httpsServer.listen(PORT, () => {
//     console.log("开始监听")
// });