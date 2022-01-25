"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.any = void 0;
const utilities_1 = require("../utilities");
const query_1 = require("./query");
/**
 * Makes a query and expects any number of results.
 */
const any = async (log, connection, clientConfiguration, rawSql, values, inheritedQueryId) => {
    const queryId = inheritedQueryId !== null && inheritedQueryId !== void 0 ? inheritedQueryId : (0, utilities_1.createQueryId)();
    const { rows, } = await (0, query_1.query)(log, connection, clientConfiguration, rawSql, values, queryId);
    return rows;
};
exports.any = any;
//# sourceMappingURL=any.js.map