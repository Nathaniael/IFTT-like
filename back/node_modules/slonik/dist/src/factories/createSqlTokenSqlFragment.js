"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSqlTokenSqlFragment = void 0;
const errors_1 = require("../errors");
const sqlFragmentFactories_1 = require("../sqlFragmentFactories");
const tokens_1 = require("../tokens");
const createSqlTokenSqlFragment = (token, greatestParameterPosition) => {
    if (token.type === tokens_1.ArrayToken) {
        return (0, sqlFragmentFactories_1.createArraySqlFragment)(token, greatestParameterPosition);
    }
    else if (token.type === tokens_1.BinaryToken) {
        return (0, sqlFragmentFactories_1.createBinarySqlFragment)(token, greatestParameterPosition);
    }
    else if (token.type === tokens_1.IdentifierToken) {
        return (0, sqlFragmentFactories_1.createIdentifierSqlFragment)(token);
    }
    else if (token.type === tokens_1.JsonToken) {
        return (0, sqlFragmentFactories_1.createJsonSqlFragment)(token, greatestParameterPosition);
    }
    else if (token.type === tokens_1.ListToken) {
        return (0, sqlFragmentFactories_1.createListSqlFragment)(token, greatestParameterPosition);
    }
    else if (token.type === tokens_1.SqlToken) {
        return (0, sqlFragmentFactories_1.createSqlSqlFragment)(token, greatestParameterPosition);
    }
    else if (token.type === tokens_1.UnnestToken) {
        return (0, sqlFragmentFactories_1.createUnnestSqlFragment)(token, greatestParameterPosition);
    }
    throw new errors_1.UnexpectedStateError();
};
exports.createSqlTokenSqlFragment = createSqlTokenSqlFragment;
//# sourceMappingURL=createSqlTokenSqlFragment.js.map