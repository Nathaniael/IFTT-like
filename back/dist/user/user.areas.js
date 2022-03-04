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
exports.UserAreas = void 0;
const common_1 = require("@nestjs/common");
const nestjs_slonik_1 = require("nestjs-slonik");
const queries_1 = require("../queries/queries");
let UserAreas = class UserAreas {
    constructor(pool) {
        this.pool = pool;
    }
    async getActionOrReactionInfos(area, aor) {
        const elem_id = aor === queries_1.AorREA.Action ? area["id_act"] : area["id_react"];
        const elem_name = aor === queries_1.AorREA.Action ? "action" : "reaction";
        const dico_name = aor === queries_1.AorREA.Action ? "adictionnary" : "readictionnary";
        var elem = await (0, queries_1.qFirstFieldsFromWhere)({ pool: this.pool, selectFields: ["params", "dico_id"], from: elem_name, where: "id", value: elem_id });
        var dico = await (0, queries_1.qFirstFieldsFromWhere)({ pool: this.pool, selectFields: ["name", "description", "service_id"], from: dico_name, where: "id", value: elem["dico_id"] });
        var service = await (0, queries_1.qFirstFieldsFromWhere)({ pool: this.pool, selectFields: ["name", "logo"], from: "service", where: "id", value: dico["service_id"] });
        return {
            "name": dico["name"],
            "description": dico["description"],
            "params": JSON.parse(elem["params"]),
            "service": {
                "name": service["name"],
                "logo": service["logo"]
            }
        };
    }
    async getAreas(userId) {
        var areas = await (0, queries_1.qAllFieldsFromWhere)({ pool: this.pool, selectFields: ["id", "id_act", "id_react"], from: "area", where: "usr_id", value: userId });
        var res = [];
        for (const area of areas) {
            var elem = {
                "id": area["id"],
                "action": await this.getActionOrReactionInfos(area, queries_1.AorREA.Action),
                "reaction": await this.getActionOrReactionInfos(area, queries_1.AorREA.Reaction)
            };
            res.push(elem);
        }
        return res;
    }
};
UserAreas = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_slonik_1.InjectPool)()),
    __metadata("design:paramtypes", [Object])
], UserAreas);
exports.UserAreas = UserAreas;
//# sourceMappingURL=user.areas.js.map