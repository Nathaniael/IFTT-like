import { DatabasePool } from 'slonik';
import { TokenCreationDto } from './oauth.dto';
export declare class OauthService {
    private readonly pool;
    constructor(pool: DatabasePool);
    private getService;
    getLink(serviceName: string): Promise<string>;
    getToken(body: TokenCreationDto): Promise<string>;
}
