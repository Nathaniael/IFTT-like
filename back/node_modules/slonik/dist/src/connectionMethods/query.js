"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.query = void 0;
const routines_1 = require("../routines");
const query = async (connectionLogger, connection, clientConfiguration, rawSql, values, inheritedQueryId) => {
    return await (0, routines_1.executeQuery)(connectionLogger, connection, clientConfiguration, rawSql, values, inheritedQueryId, async (finalConnection, finalSql, finalValues) => {
        var _a;
        const result = await finalConnection.query(finalSql, 
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        finalValues);
        return {
            command: result.command,
            fields: (result.fields || []).map((field) => {
                return {
                    dataTypeId: field.dataTypeID,
                    name: field.name,
                };
            }),
            notices: (_a = result.notices) !== null && _a !== void 0 ? _a : [],
            rowCount: result.rowCount || 0,
            rows: result.rows || [],
        };
    });
};
exports.query = query;
//# sourceMappingURL=query.js.map