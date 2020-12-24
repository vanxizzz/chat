const GroupChattingRecordModel = require("../../models/GroupChattingRecord");
const { Sequelize } = require("sequelize");
const handleResult = require("../../utils/handleResult")
async function createGroupChattingRecord({ id, ...infoObj }) {
    return await GroupChattingRecordModel.create(infoObj, { raw: true });
    if (res) {
        return res.toJSON()
    }
    return res.toJSON();
}
async function selectGroupChattingRecord(id) {
    return await GroupChattingRecordModel.findOne({
        where: {
            id
        },
        // raw: true
    });
    if (res) {
        return res.toJSON()
    }
    return res.toJSON();
}
async function updateGroupChattingRecord(id, { id: __id, ...infoObj }) {
    return await GroupChattingRecordModel.update(infoObj, {
        where: {
            id
        },
    });
}
async function deleteGroupChattingRecord(id) {

    /* 删除关系 */
    return await GroupChattingRecordModel.destroy({
        where: {
            id
        },
    });
};
exports.createGroupChattingRecord = createGroupChattingRecord;
exports.selectGroupChattingRecord = selectGroupChattingRecord;
exports.updateGroupChattingRecord = updateGroupChattingRecord;
exports.deleteGroupChattingRecord = deleteGroupChattingRecord;
