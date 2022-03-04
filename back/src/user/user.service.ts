import { BadRequestException, Injectable, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common';
import { InjectPool } from 'nestjs-slonik';
import { DatabasePool, sql } from 'slonik'
import { OauthCreationDto, UserCreationDto, UserDto, UserLoginDto } from './user.dto';
import * as bcrypt from 'bcrypt';
import { UserAuth } from 'src/auth/auth.controller';
import { qFirstFieldsFromWhere } from 'src/queries/queries';

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
        console.log(ret.rows[0])
        return ret.rows[0]
    }

    async getUser(usr: UserLoginDto) {
        let res: any;
        if (usr.email)
            res = await this.pool.query(sql`SELECT * FROM usr WHERE email =  ${usr.email}`)
        else
            throw new BadRequestException("Fields are missing")
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
        console.log(body.token, body.refresh_token, body.duration, body.generated_at, usr)
        try {
            await this.pool.query(sql`INSERT INTO oauth (
                token, refresh_token, duration, generated_at, usr_id
                ) values (${body.token}, ${body.refresh_token}, ${body.duration}, ${body.generated_at}, ${usr.userId})`)
        } catch (error) {
            console.log('hello')
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
}
