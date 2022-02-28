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
exports.ServicesService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_slonik_1 = require("nestjs-slonik");
const slonik_1 = require("slonik");
let ServicesService = class ServicesService {
    constructor(pool) {
        this.pool = pool;
    }
    async getServices() {
        let services = await this.pool.query((0, slonik_1.sql) `SELECT * FROM service`);
        let res = [];
        let idService;
        for (const service of services.rows) {
            idService = service.id;
            res.push({
                "id": service.id,
                "name": service.name,
                "logo": service.logo,
                "actions": await this.getActionsByServiceId(idService),
                "reactions": await this.getReactionsByServiceId(idService),
            });
        }
        return res;
    }
    async getActionsByServiceId(id) {
        let actions = await this.pool.query((0, slonik_1.sql) `SELECT * FROM adictionnary WHERE service_id = ${id}`);
        return actions.rows;
    }
    async getReactionsByServiceId(id) {
        let reactions = await this.pool.query((0, slonik_1.sql) `SELECT * FROM readictionnary WHERE service_id = ${id}`);
        return reactions.rows;
    }
};
ServicesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_slonik_1.InjectPool)()),
    __metadata("design:paramtypes", [Object])
], ServicesService);
exports.ServicesService = ServicesService;
//# sourceMappingURL=services.service.js.map