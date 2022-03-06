"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AreasModule = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const actions_service_1 = require("../actions/actions.service");
const oauth_service_1 = require("../oauth/oauth.service");
const user_areas_1 = require("../user/user.areas");
const areas_controller_1 = require("./areas.controller");
const areas_service_1 = require("./areas.service");
let AreasModule = class AreasModule {
};
AreasModule = __decorate([
    (0, common_1.Module)({
        imports: [axios_1.HttpModule],
        providers: [areas_service_1.AreasService, actions_service_1.ActionsService, oauth_service_1.OauthService, user_areas_1.UserAreas],
        controllers: [areas_controller_1.AreasController]
    })
], AreasModule);
exports.AreasModule = AreasModule;
//# sourceMappingURL=areas.module.js.map