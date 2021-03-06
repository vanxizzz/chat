const UserChattingRecordModel = require("../../models/UserChattingRecord");
const { Op } = require("sequelize");
const db = require("../../models/db")
async function createUserChattingRecord({ id, ...infoObj }) {
    let res =  await UserChattingRecordModel.create(infoObj,{raw:true});
    return res.toJSON()
}
async function selectUserChattingRecord(id) {
    return await UserChattingRecordModel.findOne({
        where: {
            id
        },
        raw:true
    });
}
async function updateUserChattingRecord(id, { id: __id, ...infoObj }) {
    return await UserChattingRecordModel.update(infoObj, {
        where: {
            id
        },
    });
}
async function deleteUserChattingRecord(id) {

    /* 删除关系 */
    return await UserChattingRecordModel.destroy({
        where: {
            id
        },
    });
};
exports.createUserChattingRecord = createUserChattingRecord;
exports.selectUserChattingRecord = selectUserChattingRecord;
exports.updateUserChattingRecord = updateUserChattingRecord;
exports.deleteUserChattingRecord = deleteUserChattingRecord;
