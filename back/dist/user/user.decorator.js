"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const common_1 = require("@nestjs/common");
const jwt_decode_1 = require("jwt-decode");
const auth_controller_1 = require("../auth/auth.controller");
async function getUser(access_token) {
    const jwt = await (0, jwt_decode_1.default)(access_token);
    const usr = new auth_controller_1.UserAuth(jwt);
    return usr;
}
exports.User = (0, common_1.createParamDecorator)(async (data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    if (request.headers.access_token) {
        return getUser(request.headers.access_token);
    }
    else {
        return undefined;
    }
});
//# sourceMappingURL=user.decorator.js.map