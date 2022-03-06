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
exports.AboutService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_slonik_1 = require("nestjs-slonik");
const slonik_1 = require("slonik");
let AboutService = class AboutService {
    constructor(pool) {
        this.pool = pool;
    }
    async aboutJson(ip) {
        const services = await this.pool.query((0, slonik_1.sql) `SELECT * FROM service`);
        let res = {
            client: {
                host: ip
            },
            server: {
                current_time: Date.now(),
                services: []
            }
        };
        for (const service of services.rows) {
            let qActions = await this.pool.query((0, slonik_1.sql) `SELECT * FROM adictionnary WHERE service_id = ${service.id}`);
            let qReactions = await this.pool.query((0, slonik_1.sql) `SELECT * FROM readictionnary WHERE service_id = ${service.id}`);
            let actionsTab = [];
            let reactionsTab = [];
            for (const action of qActions.rows) {
                const toPush = {
                    name: action.name,
                    description: action.description
                };
                actionsTab.push(toPush);
            }
            for (const reaction of qReactions.rows) {
                const toPush = {
                    name: reaction.name,
                    description: reaction.description
                };
                reactionsTab.push(toPush);
            }
            res.server.services.push({
                name: service.name,
                actions: actionsTab,
                reactions: reactionsTab
            });
        }
        return res;
    }
};
AboutService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_slonik_1.InjectPool)()),
    __metadata("design:paramtypes", [Object])
], AboutService);
exports.AboutService = AboutService;
//# sourceMappingURL=about.service.js.map