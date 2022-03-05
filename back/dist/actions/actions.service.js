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
const oauth_service_1 = require("../oauth/oauth.service");
let ActionsService = class ActionsService {
    constructor(pool, httpService, oauthService) {
        this.pool = pool;
        this.httpService = httpService;
        this.oauthService = oauthService;
    }
    async createHookGitlab(params, userId, action_name) {
        let event;
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
        console.log(token.token);
        try {
            const a = await this.httpService.post(`https://gitlab.com/api/v4/projects/${params.project_id}/hooks?url=${url}`, data, config).toPromise();
            console.log(a);
        }
        catch (error) {
            console.log(error);
        }
    }
    async createAction(params, service, userId, action_name) {
        switch (service) {
            case "Gitlab":
                this.createHookGitlab({ project_id: params.project_id, service: "Gitlab", scope: params.scope }, userId, action_name);
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