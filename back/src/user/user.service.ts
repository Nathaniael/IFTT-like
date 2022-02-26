import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectPool } from 'nestjs-slonik';
import { DatabasePool, sql } from 'slonik'
import { OauthCreationDto, UserCreationDto, UserDto, UserLoginDto } from './user.dto';
import * as bcrypt from 'bcrypt';
import { UserAuth } from 'src/auth/auth.controller';


@Injectable()
export class UserService {
    constructor(
        @InjectPool()
        private readonly pool: DatabasePool
    ) { }

    async registerUser(usr: UserCreationDto) {
        if (!usr.email || !usr.username || !usr.password)
            throw new UnauthorizedException("One or more of the required fields are missing")
        let res = await this.pool.query(sql`SELECT *
                FROM usr
                WHERE email = ${usr.email}
                OR username = ${usr.username}`)
        if (res.rows.length != 0) {
            throw new UnauthorizedException("Username or email already in use")
        }
        await this.pool.query(sql`INSERT INTO usr
        (username, password, email)
        values (${usr.username}, ${bcrypt.hashSync(usr.password, 10)}, ${usr.email})`)
        let ret = await this.pool.query(sql`SELECT *
                FROM usr
                WHERE email = ${usr.email}`)
        return ret.rows[0]
    }

    async getUser(usr: UserLoginDto) {
        let res: any;
        if(usr.username)
            res = await this.pool.query(sql`SELECT * FROM usr WHERE username =  ${usr.username}`)
        else if (usr.email)
            res = await this.pool.query(sql`SELECT * FROM usr WHERE email =  ${usr.email}`)
        if (res.rowCount != 1 && usr.password)
            throw new UnauthorizedException("User not found")
        await bcrypt.compare(usr.password, res.rows[0].password, function(err, bres) {
            if (err)
                throw new UnauthorizedException(err)
            if (!bres)
                throw new UnauthorizedException("Username/Password not matching")
        })
        return res.rows[0]
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
}
