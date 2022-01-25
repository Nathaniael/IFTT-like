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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_slonik_1 = require("nestjs-slonik");
const slonik_1 = require("slonik");
const bcrypt = require("bcrypt");
let UserService = class UserService {
    constructor(pool) {
        this.pool = pool;
    }
    async registerUser(usr) {
        await this.pool.query((0, slonik_1.sql) `INSERT INTO usr
        (username, password, email)
        values
        (${usr.username}, ${bcrypt.hashSync(usr.password, 10)}, ${usr.email})`);
    }
    async getUser(usr) {
        let res;
        if (usr.email)
            res = await this.pool.query((0, slonik_1.sql) `SELECT email,
             username,
             id,
             created_at,
             password
             FROM usr WHERE email = ${usr.email}`);
        else if (usr.username)
            res = await this.pool.query((0, slonik_1.sql) `SELECT email,
             username,
             id,
             created_at,
             password
             FROM usr WHERE username = ${usr.username}`);
        if (!res || res.rows.length === 0) {
            throw new common_1.NotFoundException("User not found");
        }
        return res.rows[0];
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_slonik_1.InjectPool)()),
    __metadata("design:paramtypes", [Object])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map