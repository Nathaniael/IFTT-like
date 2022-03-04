import { DatabasePool } from 'slonik';
import { TokenCreationDto } from './oauth.dto';
import { HttpService } from '@nestjs/axios';
export declare class OauthService {
    private readonly pool;
    private readonly httpService;
    constructor(pool: DatabasePool, httpService: HttpService);
    private getService;
    getLink(serviceName: string): Promise<string>;
    getTokenLink(body: TokenCreationDto): Promise<string>;
    getToken(body: TokenCreationDto): Promise<string>;
    storeToken(token: string, userId: string, service: string): Promise<void>;
    getTokenForService(userId: string, service: string): Promise<import("slonik").QueryResultRow>;
}
