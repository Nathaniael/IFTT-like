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
exports.ActionsService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const nestjs_slonik_1 = require("nestjs-slonik");
const slonik_1 = require("slonik");
const oauth_service_1 = require("../oauth/oauth.service");
let ActionsService = class ActionsService {
    constructor(pool, httpService, oauthService) {
        this.pool = pool;
        this.httpService = httpService;
        this.oauthService = oauthService;
    }
    async createHookGitlab(params, userId, action_name) {
        let event;
        console.log(action_name);
        switch (action_name) {
            case "Push event":
                event = "push_events";
            case "Merge request event":
                event = "merge_requests_events";
            case "Issues event":
                event = "issues_events";
            case "Deployment event":
                event = "deployment_events";
            case "Confidential issues event":
                event = "confidential_issues_events";
            default:
                break;
        }
        const token = await this.oauthService.getTokenForService(userId, params.service);
        const url = `http://pantharea.fun:8080/webhooks/${params.service}`;
        var data = `{"id": ${params.project_id.toString()},"url": ${url},${event}:true}`;
        var config = {
            method: 'post',
            url: `https://gitlab.com/api/v4/projects/${params.project_id}/hooks?url=${url}`,
            headers: {
                'Authorization': `Bearer ${token.token}`,
                'Content-Type': 'application/json'
            },
            data: data
        };
        try {
            const a = await this.httpService.post(`https://gitlab.com/api/v4/projects/${params.project_id}/hooks?url=${url}`, data, config).toPromise();
        }
        catch (error) {
            console.log(error);
        }
    }
    async updateWeather() {
        const areas = await this.pool.query((0, slonik_1.sql) `SELECT id, params FROM action WHERE strpos(action.params, 'Weather') != 0`);
        for (const elem of areas.rows) {
            const params = JSON.parse(elem.params);
            const res = await this.httpService.get(`http://api.weatherapi.com/v1/current.json?key=bc3eb83b600343afb4e184537220503&q=${params.city}&aqi=no`).toPromise();
            if (params.previous_value !== res.data.current.temp_c) {
                const test = params;
                test.previous_value = res.data.current.temp_c;
                this.pool.query((0, slonik_1.sql) `UPDATE action SET params = ${JSON.stringify(test)} WHERE id = ${elem.id}`);
                const reactions = await this.pool.query((0, slonik_1.sql) `SELECT * FROM reaction INNER JOIN area ON area.id_react = reaction.id WHERE area.id_act = ${elem.id}`);
                for (const reaction of reactions.rows) {
                    console.log(reaction);
                    await this.httpService.post(`http://localhost:8080/reactions/${reaction.reaction_route}`, reaction.params).toPromise();
                }
            }
        }
    }
    async createWeather(params, id) {
        console.log(params);
        const res = await this.httpService.get(`http://api.weatherapi.com/v1/current.json?key=bc3eb83b600343afb4e184537220503&q=${params.city}&aqi=no`).toPromise();
        const tmp = params;
        tmp.previous_value = res.data.current.temp_c;
        const newparams = JSON.stringify(tmp);
        await this.pool.query((0, slonik_1.sql) `UPDATE action SET params = ${newparams} WHERE id = ${id}`);
    }
    async createArea(id, action_name, user_id, param) {
        console.log(action_name);
        var params = JSON.stringify({ action_type: action_name, user_id: user_id });
        if (action_name === "Area deleted") {
            params = JSON.stringify({ action_type: action_name, user_id: user_id, id: param.id });
        }
        this.pool.query((0, slonik_1.sql) `UPDATE action SET params = ${params} WHERE id = ${id}`);
    }
    async createAction(params, service, userId, action_name, action) {
        console.log(service);
        switch (service) {
            case "Gitlab":
                await this.createHookGitlab({ project_id: params.project_id, service: "Gitlab", scope: params.scope }, userId, action_name);
                break;
            case "Weather":
                await this.createWeather(params, action.id);
            case "Area":
                this.createArea(action.id, action_name, userId, params);
                break;
            default:
                console.log("no action found");
                break;
        }
    }
};
ActionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_slonik_1.InjectPool)()),
    __metadata("design:paramtypes", [Object, axios_1.HttpService,
        oauth_service_1.OauthService])
], ActionsService);
exports.ActionsService = ActionsService;
//# sourceMappingURL=actions.service.js.map