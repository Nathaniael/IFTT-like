import { OauthCreationDto, UserCreationDto, UserLoginDto } from './user.dto';
import { DatabasePool } from 'slonik';
import { UserAuth } from 'src/auth/auth.controller';
import { HttpService } from '@nestjs/axios';
export declare class UserService {
    private readonly pool;
    private readonly httpService;
    constructor(pool: DatabasePool, httpService: HttpService);
    registerUser(usr: UserCreationDto): Promise<import("slonik").QueryResultRow>;
    getUser(usr: UserLoginDto): Promise<import("slonik").QueryResultRow>;
    getUserFromId(userId: string): Promise<any>;
    addOauthToUsr(usr: UserAuth, body: OauthCreationDto): Promise<void>;
    changeUsername(userId: string, username: string): Promise<string>;
    deleteUser(userId: string): Promise<string>;
}
