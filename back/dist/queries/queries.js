"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.qDeleteFieldsFromWhere = exports.qAllFieldsFromWhere = exports.qFirstFieldsFromWhere = exports.AorREA = void 0;
const common_1 = require("@nestjs/common");
var AorREA;
(function (AorREA) {
    AorREA[AorREA["Action"] = 0] = "Action";
    AorREA[AorREA["Reaction"] = 1] = "Reaction";
})(AorREA = exports.AorREA || (exports.AorREA = {}));
;
function checkIsThereResult(res, error) {
    if (res.rowCount == 0) {
        console.log("EXCEPT " + error);
        throw new common_1.BadRequestException(error);
    }
}
async function qFirstFieldsFromWhere(props) {
    let listFields = props.selectFields.join(", ");
    let res = await props.pool.query({
        sql: 'SELECT ' + listFields + ' FROM ' + props.from + ' WHERE ' + props.where + ' = $1',
        type: 'SLONIK_TOKEN_SQL',
        values: [props.value]
    });
    checkIsThereResult(res, "[ERROR] " + props.from + " not found with the given " + props.where);
    return res.rows[0];
}
exports.qFirstFieldsFromWhere = qFirstFieldsFromWhere;
async function qAllFieldsFromWhere(props) {
    let listFields = props.selectFields.join(", ");
    let res = await props.pool.query({
        sql: 'SELECT ' + listFields + ' FROM ' + props.from + ' WHERE ' + props.where + ' = $1',
        type: 'SLONIK_TOKEN_SQL',
        values: [props.value]
    });
    checkIsThereResult(res, "[ERROR] " + props.from + " not found with the given " + props.where);
    return res.rows;
}
exports.qAllFieldsFromWhere = qAllFieldsFromWhere;
async function qDeleteFieldsFromWhere(props) {
    let res = await props.pool.query({
        sql: 'DELETE FROM ' + props.from + ' WHERE ' + props.where + ' = $1',
        type: 'SLONIK_TOKEN_SQL',
        values: [props.value]
    });
    checkIsThereResult(res, "[ERROR] " + props.from + " not found with the given " + props.where);
    return res.rows;
}
exports.qDeleteFieldsFromWhere = qDeleteFieldsFromWhere;
//# sourceMappingURL=queries.js.map