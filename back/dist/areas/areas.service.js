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
    async callReaction(params, type) {
        console.log(params, " ", type);
        var action = await this.pool.query((0, slonik_1.sql) `SELECT * FROM action WHERE params = ${params} AND type = ${type}`);
        if (action.rowCount === 0) {
            return;
        }
        let area = await this.pool.query((0, slonik_1.sql) `SELECT * FROM area WHERE id_act = ${action.rows[0].id}`);
        console.log(area.rows[0].id);
        let reaction = await this.pool.query((0, slonik_1.sql) `SELECT * FROM reaction WHERE id = ${area.rows[0].id_react}`);
        console.log(reaction.rows[0].params);
        let data = JSON.parse(reaction.rows[0].params.toString());
        console.log("data:", data);
        this.httpService.post(`http://localhost:8080/reactions/${reaction.rows[0].reaction_route}`, data).toPromise();
    }
    checkBodyCreateArea(body) {
        if (body.action_id === undefined || body.reaction_id === undefined)
            throw new common_1.BadRequestException("Missing action or reaction");
        Object.keys(body.action_params).forEach(key => {
            var value = body.action_params[key];
            if (value === null || value === "")
                throw new common_1.BadRequestException("Bad value for: " + JSON.stringify(key));
        });
        Object.keys(body.reaction_params).forEach(key => {
            var value = body.reaction_params[key];
            if (value === null || value === "")
                throw new common_1.BadRequestException("Bad value for: " + JSON.stringify(key));
        });
    }
    async createArea(userId, body) {
        console.log(body);
        this.checkBodyCreateArea(body);
        const reaction_dico = await this.pool.query((0, slonik_1.sql) `SELECT * FROM readictionnary WHERE id = ${body.reaction_id}`);
        const reaction_service = await this.pool.query((0, slonik_1.sql) `SELECT * FROM service WHERE id = ${reaction_dico.rows[0].service_id}`);
        const action_dico = await this.pool.query((0, slonik_1.sql) `SELECT * FROM adictionnary WHERE id = ${body.action_id}`);
        const action = await this.pool.query((0, slonik_1.sql) `INSERT INTO action (params, type, dico_id)
        VALUES (${JSON.stringify(body.action_params)}, ${action_dico.rows[0].params},${body.action_id}) RETURNING id;`);
        const reaction = await this.pool.query((0, slonik_1.sql) `INSERT INTO reaction (params, type, reaction_route,dico_id)
        VALUES (${JSON.stringify(body.reaction_params)}, ${reaction_dico.rows[0].params},${reaction_service.rows[0].name} ,${body.reaction_id}) RETURNING id;`);
        const area = await this.pool.query((0, slonik_1.sql) `INSERT INTO area (
            id_act,
            id_react,
            usr_id) VALUES (
                ${action.rows[0].id},
                ${reaction.rows[0].id},
                ${userId})`);
    }
};
AreasService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_slonik_1.InjectPool)()),
    __metadata("design:paramtypes", [Object, axios_1.HttpService])
], AreasService);
exports.AreasService = AreasService;
//# sourceMappingURL=areas.service.js.map