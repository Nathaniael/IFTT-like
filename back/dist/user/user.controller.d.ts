import { UserAuth } from 'src/auth/auth.controller';
import { OauthCreationDto } from './user.dto';
import { UserService } from './user.service';
export declare class UserController {
    private readonly usersService;
    constructor(usersService: UserService);
    addOauthToUsr(usr: UserAuth, body: OauthCreationDto): Promise<void>;
    getUserProfile(usr: UserAuth): Promise<string>;
}
