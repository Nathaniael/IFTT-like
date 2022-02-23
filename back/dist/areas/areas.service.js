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
exports.AreasService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const nestjs_slonik_1 = require("nestjs-slonik");
const slonik_1 = require("slonik");
let AreasService = class AreasService {
    constructor(pool, httpService) {
        this.pool = pool;
        this.httpService = httpService;
    }
    async callReaction(service, type, data) {
        const test = await this.pool.query((0, slonik_1.sql) `SELECT * FROM area`);
        const areas = await this.pool.query((0, slonik_1.sql) `SELECT * FROM area WHERE r_service = ${service} AND r_type = ${type} AND r_params = ${JSON.stringify(data)}`);
        for (const elem of areas.rows) {
            console.log("hello");
            let reaction = await this.pool.query((0, slonik_1.sql) `SELECT * FROM reaction WHERE id = ${elem.id_react}`);
            console.log(reaction.rows[0], "SHEESH");
            this.httpService.post(`http://localhost:8080/reactions/${reaction.rows[0].reaction_route}`).toPromise();
        }
    }
    async createArea(body) {
        const action = await this.pool.query((0, slonik_1.sql) `INSERT INTO action (service_name, action_type, params) VALUES (${body.action_service_name}, ${body.action_type}, ${JSON.stringify(body.action_params)}) RETURNING id;`);
        const reaction = await this.pool.query((0, slonik_1.sql) `INSERT INTO reaction (service_name, reaction_type, params, reaction_route) VALUES (${body.reaction_service_name}, ${body.reaction_type}, ${JSON.stringify(body.reaction_params)}, ${body.reaction_route}) RETURNING id;`);
        const area = await this.pool.query((0, slonik_1.sql) `INSERT INTO area (r_service,
            r_type,
            r_params,
            id_act,
            id_react) VALUES (${body.action_service_name},
                ${body.action_type},
                ${JSON.stringify(body.action_params)},
                ${action.rows[0].id},
                ${reaction.rows[0].id})`);
        console.log(action, reaction, area);
    }
};
AreasService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_slonik_1.InjectPool)()),
    __metadata("design:paramtypes", [Object, axios_1.HttpService])
], AreasService);
exports.AreasService = AreasService;
//# sourceMappingURL=areas.service.js.map