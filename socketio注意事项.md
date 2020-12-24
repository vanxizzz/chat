## extraHeaders的使用
```js
客户端
const socket = io("http://localhost:9527", {
    transportOptions: {
        polling: {
            extraHeaders: {
                'authorization': localStorage.token
            }
        }
    }
});
服务端：
io.on('connection', socket => {
    console.log(socket.headers.authorization)
})
```

## 发送错误时候，会直接返回给前端