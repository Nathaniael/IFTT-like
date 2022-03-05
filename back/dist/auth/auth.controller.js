"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = exports.UserAuth = void 0;
const common_1 = require("@nestjs/common");
const user_dto_1 = require("../user/user.dto");
const user_service_1 = require("../user/user.service");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
class UserAuth {
    constructor(data) {
        Object.assign(this, data);
    }
}
exports.UserAuth = UserAuth;
let AuthController = class AuthController {
    constructor(userService, jwtService, configService) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async registerUser(body, res) {
        const user = await this.userService.registerUser(body);
        const payload = new UserAuth({ userId: user.id.toString(), username: user.username.toString() });
        const signed_payload = this.jwtService.sign({ payload: payload });
        res.cookie('access_token', signed_payload, {
            httpOnly: false,
            domain: (process.env.NODE_ENV === 'development') ? 'localhost' : 'pantharea.fun',
            sameSite: false,
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
        }).send({ "message": "You had been well registered" });
    }
    async loginUser(body, res) {
        const user = await this.userService.getUser(body);
        const payload = new UserAuth({ userId: user.id.toString(), username: user.username.toString() });
        const signed_payload = this.jwtService.sign({ payload: payload });
        res.cookie('access_token', signed_payload, {
            httpOnly: false,
            domain: (process.env.NODE_ENV === 'development') ? 'localhost' : 'pantharea.fun',
            sameSite: false,
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
        }).send({ "message": "You had been well logged" });
    }
};
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserCreationDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "registerUser", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserLoginDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "loginUser", null);
AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map