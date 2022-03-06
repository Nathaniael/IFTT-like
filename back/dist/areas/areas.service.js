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
const actions_service_1 = require("../actions/actions.service");
const queries_1 = require("../queries/queries");
let AreasService = class AreasService {
    constructor(pool, httpService, actionsService) {
        this.pool = pool;
        this.httpService = httpService;
        this.actionsService = actionsService;
    }
    async callReaction(params) {
        var action = await this.pool.query((0, slonik_1.sql) `SELECT * FROM action WHERE params = ${params} `);
        if (action.rowCount === 0) {
            console.log("PARAMS", params);
            return;
        }
        console.log(action.rows);
        for (var test of action.rows) {
            let area = await this.pool.query((0, slonik_1.sql) `SELECT * FROM area WHERE id_act = ${test.id}`);
            console.log(area);
            for (var elem of area.rows) {
                console.log("REACTION");
                let reaction = await this.pool.query((0, slonik_1.sql) `SELECT * FROM reaction WHERE id = ${elem.id_react}`);
                console.log(reaction);
                let data = JSON.parse(reaction.rows[0].params.toString());
                this.httpService.post(`http://localhost:8080/reactions/${reaction.rows[0].reaction_route}`, data).toPromise();
            }
        }
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
        this.checkBodyCreateArea(body);
        const reaction_dico = await (0, queries_1.qFirstFieldsFromWhere)({ pool: this.pool, selectFields: ["service_id", "params"], from: "readictionnary", where: "id", value: body.reaction_id });
        const reaction_service = await (0, queries_1.qFirstFieldsFromWhere)({ pool: this.pool, selectFields: ["name"], from: "service", where: "id", value: reaction_dico["service_id"] });
        const action_dico = await (0, queries_1.qFirstFieldsFromWhere)({ pool: this.pool, selectFields: ["service_id", "params", "name"], from: "adictionnary", where: "id", value: body.action_id });
        const action = await this.pool.query((0, slonik_1.sql) `INSERT INTO action (params, dico_id)
        VALUES (${JSON.stringify(body.action_params)}, ${body.action_id}) RETURNING id;`);
        const action_service = await (0, queries_1.qFirstFieldsFromWhere)({ pool: this.pool, selectFields: ["*"], from: "service", where: "id", value: action_dico["service_id"] });
        await this.actionsService.createAction(body.action_params, action_service["name"].toString(), userId, action_dico["name"], action.rows[0]);
        const reaction = await this.pool.query((0, slonik_1.sql) `INSERT INTO reaction (params, reaction_route,dico_id)
        VALUES (${JSON.stringify(body.reaction_params)}, ${reaction_service["name"]} ,${body.reaction_id}) RETURNING id;`);
        const area = await this.pool.query((0, slonik_1.sql) `INSERT INTO area (
            id_act,
            id_react,
            usr_id) VALUES (
                ${action.rows[0].id},
                ${reaction.rows[0].id},
                ${userId})`);
    }
    async deleteArea(id) {
        await (0, queries_1.qDeleteFieldsFromWhere)({ pool: this.pool, from: "area", where: "id", value: id });
    }
    async getAreaByUser(usrId) {
        const areas = await this.pool.query((0, slonik_1.sql) `SELECT * FROM area WHERE usr_id = ${usrId}`);
        return areas.rows;
    }
};
AreasService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_slonik_1.InjectPool)()),
    __metadata("design:paramtypes", [Object, axios_1.HttpService,
        actions_service_1.ActionsService])
], AreasService);
exports.AreasService = AreasService;
//# sourceMappingURL=areas.service.js.map