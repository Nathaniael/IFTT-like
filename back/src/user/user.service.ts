import { Injectable } from '@nestjs/common';
import { InjectPool } from 'nestjs-slonik';
import { DatabasePool, sql } from 'slonik'
import { UserCreationDto, UserDto } from './user.dto';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService {
    constructor(
        @InjectPool()
        private readonly pool: DatabasePool
    ) { }

    async registerUser(usr: UserCreationDto) {
        await this.pool.query(sql`INSERT INTO usr
        (username, password, email)
        values
        (${usr.username}, ${bcrypt.hashSync(usr.password, 10)}, ${usr.email})`)
    }

    async getUser(usr: UserCreationDto) {
        const res = await this.pool.query(sql`SELECT email,
         username,
         id,
         created_at,
         password
         FROM usr WHERE email = ${usr.email}`)
        return res.rows[0]
    }
}
