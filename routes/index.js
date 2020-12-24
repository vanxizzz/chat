const express = require("express")
const path = require("path");
const userRouter = require("./apis/user")
const catchErrorMiddleware = require("./middlewares/catchErrorMiddleware")
const corsMiddleware = require("cors");
const uploadImgRouter = require("./apis/avatar")
const { STATIC_PATH_RELATIVE } = require("../config")
module.exports = (app) => {
    // app.options((req,res)=>{

    // })

   
    app.use(corsMiddleware({
        exposedHeaders: ["authorization"],
        origin(origin, next) {
            next(null, true);
        },
        maxAge: 9999999999//这里是为了前端的axios拦截器会多发送一次options请求
    }))
    app.use(require("./middlewares/tokenMiddleware"));

    app.use(express.static(path.resolve(__dirname, "../", STATIC_PATH_RELATIVE)));
    app.use(express.urlencoded({ extended: true }))
    app.use(express.json());
    app.use("/api/avatar", uploadImgRouter);
    app.use("/api/user", userRouter);
    app.use(catchErrorMiddleware);
}