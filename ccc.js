const path = require("path")
const fs = require("fs")

console.log(fs.statSync(path.resolve(__dirname, "./config.js")))
console.log(fs.statSync(path.resolve(__dirname, "./public")))
console.log(fs.statSync(path.resolve(__dirname, "./asdsad")))