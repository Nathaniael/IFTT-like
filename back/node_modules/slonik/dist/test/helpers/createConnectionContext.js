"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createConnectionContext = void 0;
const createConnectionContext = () => {
    return {
        connectionId: '1',
        // @ts-expect-error
        log: {
            getContext: () => {
                return {
                    connectionId: '1',
                    poolId: '1',
                };
            },
        },
        poolId: '1',
    };
};
exports.createConnectionContext = createConnectionContext;
//# sourceMappingURL=createConnectionContext.js.map