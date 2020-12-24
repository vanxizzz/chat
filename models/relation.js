const UserChattingRecord = require("./UserChattingRecord");
const GroupChattingRecord = require("./GroupChattingRecord")
const Friend = require("./Friend")
const Group = require("./Group");
const User = require("./User");
const GroupUserModel = require("./Group_User")
/* 一个group有多个user，一个user可以有多个group */
Group.belongsToMany(User, {
    through: GroupUserModel,
    foreignKey: {
        name: "group_id",
        field: "group_id",
    }
})
User.belongsToMany(Group, {
    through: GroupUserModel,
    foreignKey: {
        name: "user_id",
        field: "user_id"
    }
})
/* sId和fId都是userId */
Friend.belongsTo(User, {
    foreignKey: {
        name: "f_id",
        field: "f_id",
    },
})
Friend.belongsTo(User, {
    foreignKey: {
        name: "s_id",
        field: "s_id"
    },
})
/* 
    一个用户可以有多条用户记录，一条用户记录只属于一个用户
*/
UserChattingRecord.belongsTo(User, {
    foreignKey: {
        name: "send_id",
        field: "send_id"
    }
})
UserChattingRecord.belongsTo(User, {
    foreignKey: {
        name: "to_user_id",
        field: "to_user_id"
    }
})
/*
    一个用户有多条
*/
GroupChattingRecord.belongsTo(Group, {
    foreignKey: {
        name: "to_group_id",
        field: "to_group_id"
    }
})
GroupChattingRecord.belongsTo(User, {
    foreignKey: {
        name: "send_id",
        field: "send_id"
    }
})

/*
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
*/