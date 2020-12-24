const Router = require("express").Router();
const multer = require("multer")
const path = require("path");
const { getErr, getResult } = require("../../services/getResult");
const { getUploadImgResponseUrl, UPLOAD_AVATARS_BASE_DIR } = require("../../config")
const fsPromise = require("fs").promises;
const fs = require("fs")
const storage = multer.diskStorage({
    destination(req, file, cb) {
        //配置生成文件的目录，cb第一个参数是错误对象，第二个参数是文件目录
        //到时候可以通过req.files.destination访问
        // cb(null, "./public/uploadAvatars");
        cb(null, UPLOAD_AVATARS_BASE_DIR);
    },
    filename(req, file, cb) {
        //配置生成文件名，cb第一个参数是错误对象，第二个参数是文件名
        //到时候可以通过req.files.filename访问
        cb(null, `temp-${Date.now()}-${Math.random().toString(32).slice(-6)}${Math.random().toString(32).slice(-6)}${path.extname(file.originalname)}`);
    }
})
const upload = multer({
    storage,
});
/* 上传头像 */
Router.post("/", upload.fields([{ name: "avatar", maxCount: 1 }]), (req, res) => {
    console.log(req.body);
    console.log(req.files);
    let { filename } = req.files.avatar[0];
    res.send(getResult({
        msg: "上传成功", data: {
            // imgSrc: `${UPLOAD_AVATARS_RESPONSE_URL}/${filename}`,
            imgSrc: getUploadImgResponseUrl({ imgName: filename }),

        }
    }))
}
)
Router.get("/:filename", async (req, res) => {
    console.log(req.params.filename);
    let targetPath = path.resolve(__dirname, "../../", UPLOAD_AVATARS_BASE_DIR, req.params.filename);
    console.log(targetPath)
    try {
        let data = await fsPromise.readFile(targetPath);
        res.end(data)
    } catch (error) {
        console.log("错误！！！！")
        console.log(error)
        res.status(404).send(getErr({msg:"该图片不存在"}))
    }
})

module.exports = Router;