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
const queries_1 = require("../queries/queries");
let UserService = class UserService {
    constructor(pool) {
        this.pool = pool;
    }
    async registerUser(usr) {
        if (!usr.email || !usr.username || !usr.password)
            throw new common_1.BadRequestException('One or more of the required fields are missing');
        let res = await this.pool.query((0, slonik_1.sql) `SELECT *
                FROM usr
                WHERE email = ${usr.email}`);
        if (res.rows.length != 0) {
            throw new common_1.BadRequestException("Email already in use");
        }
        await this.pool.query((0, slonik_1.sql) `INSERT INTO usr
        (username, password, email, image)
        values (${usr.username}, ${bcrypt.hashSync(usr.password, 10)}, ${usr.email}, ${usr.image})`);
        let ret = await this.pool.query((0, slonik_1.sql) `SELECT *
                FROM usr
                WHERE email = ${usr.email}`);
        console.log(ret.rows[0]);
        return ret.rows[0];
    }
    async getUser(usr) {
        if (!usr.email)
            throw new common_1.BadRequestException("Fields are missing");
        let res = await this.pool.query((0, slonik_1.sql) `SELECT * FROM usr WHERE email =  ${usr.email}`);
        if (!usr.password)
            throw new common_1.BadRequestException("Fields are missing");
        if (res.rowCount != 1)
            throw new common_1.BadRequestException("User not found");
        let match = bcrypt.compareSync(usr.password, res.rows[0].password);
        if (match) {
            return res.rows[0];
        }
        else {
            throw new common_1.UnauthorizedException("Password doesn't match");
        }
    }
    async getUserFromId(userId) {
        let res;
        res = await (0, queries_1.qFirstFieldsFromWhere)({ pool: this.pool, selectFields: ["*"], from: "usr", where: "id", value: userId });
        return res;
    }
    async addOauthToUsr(usr, body) {
        console.log(body.token, body.refresh_token, body.duration, body.generated_at, usr);
        try {
            await this.pool.query((0, slonik_1.sql) `INSERT INTO oauth (
                token, refresh_token, duration, generated_at, usr_id
                ) values (${body.token}, ${body.refresh_token}, ${body.duration}, ${body.generated_at}, ${usr.userId})`);
        }
        catch (error) {
            console.log('hello');
            throw error;
        }
    }
    async changeUsername(userId, username) {
        await this.pool.query((0, slonik_1.sql) `UPDATE usr
            SET username = ${username}
            WHERE id = ${userId}`);
        return "Username well changed !";
    }
    async deleteUser(userId) {
        await (0, queries_1.qDeleteFieldsFromWhere)({ pool: this.pool, from: "usr", where: "id", value: userId });
        return "User deleted";
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_slonik_1.InjectPool)()),
    __metadata("design:paramtypes", [Object])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map