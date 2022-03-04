import { UserAuth } from 'src/auth/auth.controller';
import { TokenCreationDto } from './oauth.dto';
import { OauthService } from './oauth.service';
export declare class OauthController {
    private readonly oauthService;
    constructor(oauthService: OauthService);
    getAuthLink(body: {
        name: string;
    }): Promise<string>;
    getToken(user: UserAuth, body: TokenCreationDto): Promise<string>;
}
