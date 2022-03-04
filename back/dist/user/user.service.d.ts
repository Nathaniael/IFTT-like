import { DatabasePool } from 'slonik';
import { OauthCreationDto, UserCreationDto, UserLoginDto } from './user.dto';
import { UserAuth } from 'src/auth/auth.controller';
export declare class UserService {
    private readonly pool;
    constructor(pool: DatabasePool);
    registerUser(usr: UserCreationDto): Promise<import("slonik").QueryResultRow>;
    getUser(usr: UserLoginDto): Promise<any>;
    getUserFromId(userId: string): Promise<any>;
    addOauthToUsr(usr: UserAuth, body: OauthCreationDto): Promise<void>;
}
