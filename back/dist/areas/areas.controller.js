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
exports.AreasController = void 0;
const common_1 = require("@nestjs/common");
const areas_dto_1 = require("./areas.dto");
const areas_service_1 = require("./areas.service");
const passport_1 = require("@nestjs/passport");
const user_decorator_1 = require("../user/user.decorator");
let AreasController = class AreasController {
    constructor(areasServices) {
        this.areasServices = areasServices;
    }
    async createArea(user, body, res) {
        await this.areasServices.createArea(user.userId, body);
        res.status(200).send("Area well created");
    }
    async deleteArea(user, body, res) {
        await this.areasServices.deleteArea(body.id.toString());
        res.status(200).send("Area deleted successfully");
    }
    async getAreasByUser(user, body, res) {
        var _a;
        var userId;
        if (((_a = user["payload"]) === null || _a === void 0 ? void 0 : _a.userId) != undefined) {
            userId = user["payload"].userId;
        }
        else if (user.userId != undefined) {
            userId = user.userId;
        }
        else {
            throw new common_1.BadRequestException("Can't get user");
        }
        res.status(200).json(await this.areasServices.getAreaByUser(userId));
    }
};
__decorate([
    (0, common_1.Post)('/create'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, areas_dto_1.AreaCreationDto, Object]),
    __metadata("design:returntype", Promise)
], AreasController.prototype, "createArea", null);
__decorate([
    (0, common_1.Post)('/delete'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, areas_dto_1.AreaId, Object]),
    __metadata("design:returntype", Promise)
], AreasController.prototype, "deleteArea", null);
__decorate([
    (0, common_1.Get)('/get'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AreasController.prototype, "getAreasByUser", null);
AreasController = __decorate([
    (0, common_1.Controller)('areas'),
    __metadata("design:paramtypes", [areas_service_1.AreasService])
], AreasController);
exports.AreasController = AreasController;
//# sourceMappingURL=areas.controller.js.map