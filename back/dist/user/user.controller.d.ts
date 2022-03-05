import { UserAuth } from 'src/auth/auth.controller';
import { OauthCreationDto, Username } from './user.dto';
import { UserService } from './user.service';
import { UserAreas } from './user.areas';
export declare class UserController {
    private readonly usersService;
    private readonly userAreas;
    constructor(usersService: UserService, userAreas: UserAreas);
    addOauthToUsr(usr: UserAuth, body: OauthCreationDto): Promise<void>;
    changeUsername(usr: UserAuth, body: Username): Promise<string>;
    getUserProfile(usr: UserAuth, res: any): Promise<void>;
    getAreas(usr: UserAuth, res: any): Promise<void>;
    deleteUsr(usr: UserAuth, res: any): Promise<void>;
}
