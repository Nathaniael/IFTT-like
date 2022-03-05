import { HttpService } from '@nestjs/axios';
import { DatabasePool } from 'slonik';
import { OauthService } from 'src/oauth/oauth.service';
import { HookCreationDto } from './actions.dto';
export declare class ActionsService {
    private readonly pool;
    private readonly httpService;
    private readonly oauthService;
    constructor(pool: DatabasePool, httpService: HttpService, oauthService: OauthService);
    createHookGitlab(params: HookCreationDto, userId: string, action_name: string): Promise<void>;
    createAction(params: any, service: string, userId: string, action_name: string): Promise<void>;
}
