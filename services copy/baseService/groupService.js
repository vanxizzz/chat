const GroupModel = require("../../models/Group");
const { Op } = require("sequelize");
async function createGroup({ id, ...infoObj }) {
    let res = await GroupModel.create(infoObj, { raw: true });
    return res.toJSON();
}
async function selectGroup(id) {
    return await GroupModel.findOne({
        where: {
            id
        },
        raw: true
    });
}
async function updateGroup(id, { id: __id, ...infoObj }) {
    return await GroupModel.update(infoObj, {
        where: {
            id
        },
    });
}
async function deleteGroup(id) {

    /* 删除关系 */
    return await GroupModel.destroy({
        where: {
            id
        },
    });
};
exports.createGroup = createGroup;
exports.selectGroup = selectGroup;
exports.updateGroup = updateGroup;
exports.deleteGroup = deleteGroup;
