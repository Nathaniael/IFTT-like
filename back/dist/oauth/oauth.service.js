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
exports.OauthService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_slonik_1 = require("nestjs-slonik");
const slonik_1 = require("slonik");
let OauthService = class OauthService {
    constructor(pool) {
        this.pool = pool;
    }
    async getService(serviceName) {
        const res = await this.pool.query((0, slonik_1.sql) `SELECT * FROM oauth_dictionnary WHERE service = ${serviceName}`);
        const service = res.rows[0];
        return service;
    }
    async getLink(serviceName) {
        const service = await this.getService(serviceName);
        return `${service.query_code}?client_id=${service.client_id}&redirect_uri=${service.redirect_uri}&scope=${service.scope}`;
    }
    async getToken(body) {
        const service = await this.getService(body.serviceName);
        return `${service.query_token}?client_id=${service.client_id}&client_secret=${service.client_secret}&redirect_uri=${service.redirect_uri}&code=${body.code}`;
    }
};
OauthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_slonik_1.InjectPool)()),
    __metadata("design:paramtypes", [Object])
], OauthService);
exports.OauthService = OauthService;
//# sourceMappingURL=oauth.service.js.map