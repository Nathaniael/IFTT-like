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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const auth_controller_1 = require("../auth/auth.controller");
const user_decorator_1 = require("./user.decorator");
const user_dto_1 = require("./user.dto");
const user_service_1 = require("./user.service");
const user_areas_1 = require("./user.areas");
let UserController = class UserController {
    constructor(usersService, userAreas) {
        this.usersService = usersService;
        this.userAreas = userAreas;
    }
    async addOauthToUsr(usr, body) {
        return this.usersService.addOauthToUsr(usr, body);
    }
    async changeUsername(usr, body) {
        return this.usersService.changeUsername(usr.userId, body.username);
    }
    async getUserProfile(usr, res) {
        const user = await this.usersService.getUserFromId(usr.userId);
        res.status(200).json(user);
    }
    async getAreas(usr, res) {
        const areas = await this.userAreas.getAreas(usr.userId);
        res.status(200).json(areas);
    }
    async deleteUsr(usr, res) {
        const status = await this.usersService.deleteUser(usr.userId);
        res.status(200).json(status);
    }
};
__decorate([
    (0, common_1.Post)('addOAuth'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_controller_1.UserAuth, user_dto_1.OauthCreationDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "addOauthToUsr", null);
__decorate([
    (0, common_1.Post)('username'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_controller_1.UserAuth, user_dto_1.Username]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "changeUsername", null);
__decorate([
    (0, common_1.Get)('profile'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_controller_1.UserAuth, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserProfile", null);
__decorate([
    (0, common_1.Get)('areas'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_controller_1.UserAuth, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAreas", null);
__decorate([
    (0, common_1.Delete)(''),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_controller_1.UserAuth, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUsr", null);
UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService,
        user_areas_1.UserAreas])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map