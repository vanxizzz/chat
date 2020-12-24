const GroupUserModel = require("../../models/Group_User");
const GroupModel = require("../../models/Group")
const { Op } = require("sequelize");
const handleResult = require("../../utils/handleResult")
require("../../models")
async function createGroupUser({ id, ...infoObj } = {}) {
    if (infoObj.group_id == null || infoObj.user_id == null) {
        return false;
    }

    /* 先查询是否已经在群里了 */
    let p2 = await GroupUserModel.findOne({
        where: {
            group_id: infoObj.group_id,
            user_id: infoObj.user_id
        },
        // raw: true
    });
    if (p2) {
        return false;
    }
    return await GroupUserModel.create(infoObj);
    return res.toJSON()
}
/**
 * {
            user_id: yourId,
            group_id: id,
            name,
            joinTime: createdAt,

        }
 * @param {*} yourId 
 */
async function selectGroupUser(yourId) {
    let res = await GroupUserModel.findAll({
        where: {
            user_id: yourId
        },
        // raw: true,
    });
    if (res.length === 0) {
        return [];
    }
    res = res.map((it) => {
        let { group_id, user_id, createdAt } = it.toJSON();
        return {
            group_id,
            user_id,
            createdAt
        }
    })
    res = await GroupModel.findAll({
        where: {
            id: res.map(item => item.group_id)
        },
        // raw: true
    })
    // res = res.map(({id, name, createdAt}) => {
    //     return {
    //         user_id: yourId,
    //         group_id: id,
    //         name,
    //         joinTime: createdAt,

    //     }
    // });
    res = res.map((it) => {
        let { id, name, createdAt, ...options } = it.toJSON();
        return {
            ...options,
            user_id: yourId,
            group_id: id,
            name,
            joinTime: createdAt,
        }
    });
    return res;
}
async function updateGroupUser(id, { id: __id, ...infoObj }) {
    return await GroupUserModel.update(infoObj, {
        where: {
            id
        },
        // raw: true
    });
}
async function deleteGroupUser(yourId, targetId) {
    /* 删除记录 */

    /* 删除关系 */
    return await GroupUserModel.destroy({
        where: {
            [Op.or]: [
                {
                    "s_id": yourId,
                    "f_id": targetId
                },
                {
                    "s_id": targetId,
                    "f_id": yourId
                }

            ]
        },
        // raw: true
    });
};

// selectGroupUser(86).then(res => {
//     console.log(res)
// })
exports.createGroupUser = handleResult(createGroupUser);
exports.selectGroupUser = handleResult(selectGroupUser);
exports.updateGroupUser = handleResult(updateGroupUser);
exports.deleteGroupUser = handleResult(deleteGroupUser);
