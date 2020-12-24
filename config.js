const path = require("path")
const os = require("os")
/* host地址 */
// const HOST = "https://zyxin.top";
const HOST = "http://localhost";
// const HOST = "https://zyxin.top";
exports.HOST = HOST;
/* 端口 */
const PORT = 9527;
exports.PORT = PORT;
/* 网络地址 */
const URL = `${HOST}:${PORT}`
exports.URL = URL;
/* 静态资源的相对路径 */
const STATIC_PATH_RELATIVE = "public"
exports.STATIC_PATH_RELATIVE = STATIC_PATH_RELATIVE;
/* 保存上传图片相对路径 */
// const UPLOAD_AVATARS_BASE_DIR = `${STATIC_PATH_RELATIVE}/uploadAvatars`;
const UPLOAD_AVATARS_BASE_DIR = `uploadAvatars`;
exports.UPLOAD_AVATARS_BASE_DIR = UPLOAD_AVATARS_BASE_DIR;
/* 请求返回的图片路径 */
const UPLOAD_AVATARS_RESPONSE_URL = `${URL}/api/avatar`
exports.UPLOAD_AVATARS_RESPONSE_URL = UPLOAD_AVATARS_RESPONSE_URL;

/* 响应给客户端的上传图片的路径 */
exports.getUploadImgResponseUrl = ({ imgName }) => {
    imgName = imgName.replace(/^\//, "");
    return UPLOAD_AVATARS_RESPONSE_URL + "/" + imgName
}
exports.getUploadImgStoreDatabaseUrl = ({ imgName }) => {
    imgName = imgName.replace(/^\//, "");
    return `${UPLOAD_AVATARS_BASE_DIR}/${imgName}`;
}








