
# websocket聊天室
## 一些信息
作者：赵彦鑫
开始时间:2020-12-14 11:00
## 后端
### 数据表
用户表（id,账号，密码，姓名，头像，创建时间，销毁时间）
聊天记录表
    id
    send_id发出消息人的id
    to_user_id好友的id
    to_group_id群表id
    type: 类型（群的话为group，好友的话为friend）
    info: 聊天信息（富文本）
    创建时间
    销毁时间
好友表
    id
    f_id 第一个人的id
    s_id,第二个人的id
群表
    id
    group_one_id群友id
群信息表
    id
    group_id群的id
    name群名

    
    
### api

客户端：向a好友发送聊天，传来自己的id和好友的id
服务端：创建一个房间，房间号命名规则：`user:myid targetId`，把两人放到该房间里，进行通信

客户端：向群里发送聊天
服务端：将群里所有人锁在一个房间里，通知所有人


    






