const path = require("path")
const fsPromise = require("fs").promises
const delay = require("./utils/delay")
const defaultOptions = {
    intervalTime: 10,//隔多少秒检查一次
    targetDir: path.resolve(__dirname, "./public"),
    tempTag: "temp",//图片名称中的temp标志
    limitTime: 3,//多少秒之内的图片不删
}
async function intervalClearTempImg(opt = {}) {
    let { intervalTime, targetDir, tempTag, limitTime } = {
        ...defaultOptions,
        ...opt
    }
    intervalTime = intervalTime * 1000;
    limitTime = limitTime * 1000;
    console.log(targetDir)
    try {
        while (1) {
            let imgNames = await fsPromise.readdir(targetDir);
            console.log(imgNames)
            let tempImgPath = imgNames.filter(item => {
                let [tempStr, timestamp, img] = item.split("-");
                if (tempStr !== tempTag) {
                    return false;
                }
                if (Date.now() - timestamp < limitTime) {
                    return false;
                }
                return true;
            }).map(item => {
                return Promise.resolve(fsPromise.unlink(path.resolve(targetDir, item)))
            });
            console.log(tempImgPath);
            await Promise.all(tempImgPath);
            await delay(intervalTime);
        }
    } catch (error) {
        console.log("错误")
        console.log(error)
    }

}
// intervalClearTempImg({
//     targetDir: path.resolve("./public/uploadAvatars"),

// })
module.exports = intervalClearTempImg;