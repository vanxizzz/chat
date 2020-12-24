const FriendModel = require("../../models/Friend");
const { Op } = require("sequelize");
const UserModel = require("../../models/User")
const handleResult = require("../../utils/handleResult")
require("../../models")
async function createFriend({ id, ...infoObj } = {}) {
    if (infoObj.s_id === infoObj.f_id) {
        return null;
    }
    /* 先查询是否已经是好友了 */
    let p2 = await FriendModel.findOne({
        where: {
            [Op.or]: [
                {
                    "s_id": infoObj.s_id,
                    "f_id": infoObj.f_id
                },
                {
                    "s_id": infoObj.f_id,
                    "f_id": infoObj.s_id
                }

            ],
        },
        raw: true
    });
    if (p2) {
        return false;
    }
    return await FriendModel.create(infoObj, { raw: true });
}
async function selectFriend(yourId) {
    return await FriendModel.findAll({
        where: {
            [Op.or]: [
                {
                    "s_id": yourId
                },
                {
                    "f_id": yourId
                },
            ]
        },
        // include: [UserModel]
        // raw: true
    });
}
async function updateFriend(id, { id: __id, ...infoObj }) {
    return await FriendModel.update(infoObj, {
        where: {
            id
        },
    });
    return res
}
async function deleteFriend(yourId, targetId) {
    /* 删除关系 */
    let res = await FriendModel.destroy({
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
    });
    return res;
};
// createFriend({ s_id: 127, f_id: 128 })
// selectFriend(85).then(res => {
//     res.forEach(item => {
//         console.log({ ...item })
//     })
// })
exports.createFriend = handleResult(createFriend);
exports.selectFriend = handleResult(selectFriend);
exports.updateFriend = handleResult(updateFriend);
exports.deleteFriend = handleResult(deleteFriend);
