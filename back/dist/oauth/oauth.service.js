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
const axios_1 = require("@nestjs/axios");
let OauthService = class OauthService {
    constructor(pool, httpService) {
        this.pool = pool;
        this.httpService = httpService;
    }
    async getService(serviceName) {
        const res = await this.pool.query((0, slonik_1.sql) `SELECT * FROM service WHERE name = ${serviceName}`);
        const service = res.rows[0];
        return service;
    }
    async getLink(serviceName) {
        const service = await this.getService(serviceName);
        return `${service.query_code}?client_id=${service.client_id}&redirect_uri=${service.redirect_uri}&response_type=code&scope=${service.scope}`;
    }
    async storeToken(token, userId, service) {
        console.log(token);
        console.log(userId);
        console.log(service);
        const tok = await this.pool.query((0, slonik_1.sql) `SELECT * FROM oauth WHERE service = ${service} AND usr_id = ${userId}`);
        if (tok.rowCount === 1) {
            await this.pool.query((0, slonik_1.sql) `UPDATE oauth SET token = ${token} WHERE service = ${service} AND usr_id = ${userId}`);
            return;
        }
        await this.pool.query((0, slonik_1.sql) `INSERT INTO oauth (token, refresh_token, duration, generated_at, usr_id, service) VALUES (${token}, 'none', 'none', now(), ${userId}, ${service})`);
    }
    async getTokenForService(userId, service) {
        const tokenList = await this.pool.query((0, slonik_1.sql) `SELECT token FROM oauth WHERE service = ${service} AND usr_id = ${userId}`);
        if (tokenList.rowCount >= 1) {
            return tokenList.rows[0];
        }
        throw new common_1.NotFoundException('No token registered for this service');
    }
};
OauthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_slonik_1.InjectPool)()),
    __metadata("design:paramtypes", [Object, axios_1.HttpService])
], OauthService);
exports.OauthService = OauthService;
//# sourceMappingURL=oauth.service.js.map