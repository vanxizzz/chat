import socketio from "socket.io-client"
import store from "../store"
import { MessageBox, Message, Notification } from "element-ui"
import delay from "../utils/delay"
class MySocket {
    constructor() {
        this.socket = null;
    }
    /* 启动socket */
    launch() {
        if (store.state.user.info.id == undefined) {
            /* 没登录 */
            this.disconnect();
            return;
        }
        console.log("尽量了")
        const socket = socketio(
            // "/api/socket",
            "/api/socket",
            // "http://localhost:9527/api/socket",
            {
                timeout: 1000 * 60 * 60,
                transportOptions: {
                    polling: {
                        extraHeaders: {
                            'authorization': localStorage.token
                        }
                    }
                }
            }
        );
        // const socket = socketio(
        //     "/api/socket",
        //     {
        //         transportOptions: {
        //             polling: {
        //                 extraHeaders: {
        //                     'authorization': localStorage.token
        //                 }
        //             }
        //         }
        //         // extraHeaders: { 'authorization': localStorage.token },
        //     }
        // );
        this.socket = socket;//放到实例上，方便emit
        console.log("?????????")
        this.bindEvent();
    }
    bindEvent() {
        const socket = this.socket;
        if (!socket) {
            return;
        }
        console.log("&&&&&&&&&&")
        console.log(socket)
        window.abc = socket;
        document.body.onunload = () => {
            console.log("页面要关闭了===============")
            this.disconnect();
        }
        socket.on("connect", (data) => {
            console.log("连接开启");


        })
        socket.on("whoami", (resp) => {
            console.log("我是")
            console.log(resp)
        });
        socket.on("getFriends", (resp) => {
            console.log("朋友数据")
            console.log(resp);
            if (resp.status) {
                store.commit("user/initFriends", resp.data);
            }
        })
        socket.on("getGroups", (resp) => {
            console.log("群数据")
            console.log(resp);
            if (resp.status) {
                store.commit("user/initGroups", resp.data);
            }
        })
        /* 获取所有聊天记录 */
        socket.on("getAllChattingRecord", resp => {
            console.log("聊天记录")
            console.log(resp);
            if (resp.status) {
                store.commit("chatting/initFriendChatting", resp.data.friendChatting);
                store.commit("chatting/initGroupChatting", resp.data.groupChatting);
            }
        })

        socket.on("sendUserChatting", (resp) => {
            console.log("发送给好友消息了，", resp);

        })
        socket.on("joinUserRoom", (resp) => {
            console.log("加入房间成功")
            console.log(resp)
        })
        socket.on("sendGroupChatting", (resp) => {
            console.log("发送群消息了", resp);

        })
        socket.on("getGroupChatting", (resp) => {
            console.log("某个群发来的消息")
            console.log(resp)
            if (resp.status) {
                const { targetId } = store.state.chatting.curChattingTarget;
                socket.emit("getChatting", { targetId, type: "group", getAll: true })
            }
            // socket
        })
        /* 初始化完成后 */
        socket.on("initComplete", () => {
            /* 因为第一次有http请求 */
            console.log("@@@@@@@@@@@@@@@")
            socket.emit("getFriends");//获取朋友数据
            socket.emit("getGroups");//获取群数据
            socket.emit("getAllChattingRecord", { getAll: true });//获取所有群和朋友的聊天记录
        })
        socket.on("joinGroupRoom", (resp) => {
            console.log("可以开始群聊了")
            console.log(resp)
        })
        socket.on("disconnect", () => {
            console.log("服务端那边断开了")
        })
        socket.on("getUserChatting", (resp) => {
            console.log("某个好友发来的消息")
            // console.log(resp)
            // let str = `
            //     <div>
            //         id为${resp.data.send_id}给id为${resp.data.to_user_id}发了条消息：${resp.data.info}    
            //     </div>
            // `;
            // $(".infos").innerHTML += str;
            console.log("resppppppppp");
            console.log(resp);
            /* 
            createdAt: "2020-12-21T05:59:37.292Z"
id: 1806
info: "333"
send_id: 152
to_user_id: 168
updatedAt: "2020-12-21T05:59:37.292Z"
            */
            if (resp.status) {
                const { id: myId } = store.state.user.info;
                // debugger;
                let targetId = resp.data.send_id === myId ? resp.data.to_user_id : resp.data.send_id;
                let isExit = store.state.user.info.friends.find(item => item.id === targetId);
                if (!isExit) {
                    /* 新朋友，重新刷新下好友列表 */
                    socket.emit("getFriends", true);
                    socket.emit("joinUserRoom", targetId);
                }
                socket.emit("getChatting", { myId, targetId, type: "user", getAll: true });//获取所有群和朋友的聊天记录
                // store.commit("chatting/updateCurChattingTarget", resp.data);
            }
        })
        socket.on("getChatting", resp => {
            // debugger;
            console.log("getChatting")
            console.log(resp)
            store.commit("chatting/updateCurChattingTarget", resp.data);
        })
        socket.on("enquireAddFriend", async (resp) => {
            const { id: myId } = store.state.user.info;
            if (!resp.status) {
                /* 失败 */
                Message({
                    type: "error",
                    message: resp.msg
                });
                return;
            }
            const { title, info, targetData, name, allow, isFinish } = resp.data;
            if (!isFinish) {
                /* 对方想添加你 */
                try {
                    await MessageBox.confirm(info, title)
                    /* 同意了 -> 添加为好友 ->  */
                    socket.emit("enquireAddFriend", { targetAccount: targetData.account, allow: true })
                } catch (error) {
                    socket.emit("enquireAddFriend", { targetAccount: targetData.account, allow: false })
                };
            } else {
                /* 遭到同意或拒绝 */
                Message({
                    type: allow ? "success" : "warning",
                    message: info
                });
                if (allow) {
                    socket.emit("joinUserRoom", { targetId: targetData.id });
                    socket.emit("getFriends", true);
                    socket.emit("getChatting", { type: "user", targetId: targetData.id, getAll: true })
                }
            }
        })
        /* 处理服务端报错显示 */
        socket.on('backend_error', (resp) => {
            console.log("服务端那边发送错误了")
            Message({
                type: "error",
                message: resp.msg
            });
        });
        socket.on("backend_info", (resp) => {
            Message({
                type: "info",
                message: resp.msg
            });
        });
        socket.on("backend_success", resp => {
            Message({
                type: "success",
                message: resp.msg
            });
        })
        socket.on("enquireAddGroup", async resp => {
            if (!resp.status) {
                /* 失败 */
                Message({
                    type: "error",
                    message: resp.msg
                });
                return;
            }
            const { allow, userData, groupData, info, isFinish } = resp.data;
            if (!isFinish) {
                /* 对方想添加你 */
                try {
                    await MessageBox.confirm(info, "消息提示")
                    /* 同意了 -> 添加为好友 ->  */
                    socket.emit("enquireAddGroup", { targetId: userData.id, targetGroupData: { id: groupData.id }, allow: true })
                } catch (error) {
                    socket.emit("enquireAddGroup", { targetId: userData.id, targetGroupData: { id: groupData.id }, allow: false })
                };
            } else {
                /* 遭到同意或拒绝 */
                // debugger;
                Message({
                    type: allow ? "success" : "warning",
                    message: info
                });
                if (allow) {
                    socket.emit("getGroups", true);
                }
            }
        })
        socket.on("addGroup", (resp) => {
            if (resp.status) {
                /* 更新群 */
                socket.emit("getGroups")
            }
        })
        socket.on("createGroup_success", async resp => {
            if (resp.status) {
                const { inviteTarget, groupData } = resp.data;
                socket.emit("getGroups", true);
                // inviteTarget.forEach(item => {
                //     /* 每个item长这样：{id:xx} */
                //     socket.emit("enquireAddGroup", {
                //         targetId: item.id,
                //         newGroup: false,
                //         targetGroupData: groupData,
                //     });
                // })
                for (let i = 0; i < inviteTarget.length; i++) {
                    socket.emit("enquireAddGroup", {
                        targetId: inviteTarget[i].id,
                        newGroup: false,
                        targetGroupData: groupData,
                    });
                    await delay(100);
                }
            }
        })
        /* 更新个人信息成功 */
        socket.on("updateMyInfo_success", async resp => {
            // if (resp.status) {
            //     store.commit("user/updateMyInfo", resp.data);
            // }
        })

    }
    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
        }
    }
    emit(...args) {
        console.log(args)
        this.socket.emit(...args);
    }
    on(...args) {
        this.socket.on(...args);
    }
};
const socket = new MySocket();
export default socket;