import { BadRequestException, Injectable, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common';
import { InjectPool } from 'nestjs-slonik';
import { OauthCreationDto, UserCreationDto, UserDto, UserLoginDto } from './user.dto';
import { DatabasePool, sql } from 'slonik'
import * as bcrypt from 'bcrypt';
import { UserAuth } from 'src/auth/auth.controller';
import { qFirstFieldsFromWhere, qDeleteFieldsFromWhere } from 'src/queries/queries';

@Injectable()
export class UserService {
    constructor(
        @InjectPool()
        private readonly pool: DatabasePool
    ) { }

    async registerUser(usr: UserCreationDto) {
        if (!usr.email || !usr.username || !usr.password)
            throw new BadRequestException('One or more of the required fields are missing')
        let res = await this.pool.query(sql`SELECT *
                FROM usr
                WHERE email = ${usr.email}`)
        if (res.rows.length != 0) {
            throw new BadRequestException("Email already in use")
        }
        await this.pool.query(sql`INSERT INTO usr
        (username, password, email, image)
        values (${usr.username}, ${bcrypt.hashSync(usr.password, 10)}, ${usr.email}, ${usr.image})`)
        let ret = await this.pool.query(sql`SELECT *
                FROM usr
                WHERE email = ${usr.email}`)
        return ret.rows[0]
    }

    async getUser(usr: UserLoginDto) {
        if (!usr.email)
            throw new BadRequestException("Fields are missing")
        let res = await this.pool.query(sql`SELECT * FROM usr WHERE email =  ${usr.email}`)
        if (!usr.password)
            throw new BadRequestException("Fields are missing")
        if (res.rowCount != 1)
            throw new BadRequestException("User not found")
        let match = bcrypt.compareSync(usr.password, res.rows[0].password); // true
        if (match) {
            return res.rows[0]
        } else {
            throw new UnauthorizedException("Password doesn't match")
        }
    }

    async getUserFromId(userId: string) {
        let res: any;

        res = await qFirstFieldsFromWhere({ pool: this.pool, selectFields: ["*"], from: "usr", where: "id", value: userId})
        return res
    }

    async addOauthToUsr(usr: UserAuth, body: OauthCreationDto) {
        try {
            await this.pool.query(sql`INSERT INTO oauth (
                token, refresh_token, duration, generated_at, usr_id
                ) values (${body.token}, ${body.refresh_token}, ${body.duration}, ${body.generated_at}, ${usr.userId})`)
        } catch (error) {
            throw error
        }
    }

    async changeUsername(userId: string, username: string) {
        await this.pool.query(
            sql`UPDATE usr
            SET username = ${username}
            WHERE id = ${userId}`)
        return "Username well changed !"     
    }

    async deleteUser(userId: string) {
        await qDeleteFieldsFromWhere({ pool: this.pool, from: "usr", where: "id", value: userId})
        return "User deleted"
    }
}
