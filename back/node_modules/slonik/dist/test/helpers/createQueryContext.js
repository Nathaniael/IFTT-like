"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createQueryContext = void 0;
const createQueryContext = () => {
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
exports.createQueryContext = createQueryContext;
//# sourceMappingURL=createQueryContext.js.map