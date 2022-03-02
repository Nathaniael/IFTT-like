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
exports.WebhooksController = void 0;
const common_1 = require("@nestjs/common");
const areas_service_1 = require("../areas/areas.service");
const webhooks_service_1 = require("./webhooks.service");
let WebhooksController = class WebhooksController {
    constructor(webhooksServices, areasServices) {
        this.webhooksServices = webhooksServices;
        this.areasServices = areasServices;
    }
    async reactionGithub(req, body) {
        let params = JSON.stringify({ repoId: body.repository.id, secret: req.headers["x-hub-signature"] });
        this.areasServices.callReaction(params, "");
    }
    async reactionGitlab(req, body) {
        const type = JSON.stringify({
            event_name: body.event_name,
            service: "Gitlab"
        });
        const params = JSON.stringify({
            project_id: body.project_id
        });
        this.areasServices.callReaction(params, type);
    }
};
__decorate([
    (0, common_1.Post)('Github'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], WebhooksController.prototype, "reactionGithub", null);
__decorate([
    (0, common_1.Post)('Gitlab'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], WebhooksController.prototype, "reactionGitlab", null);
WebhooksController = __decorate([
    (0, common_1.Controller)('webhooks'),
    __metadata("design:paramtypes", [webhooks_service_1.WebhooksService,
        areas_service_1.AreasService])
], WebhooksController);
exports.WebhooksController = WebhooksController;
//# sourceMappingURL=webhooks.controller.js.map