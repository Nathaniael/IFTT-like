import { Injectable } from '@nestjs/common';
import { InjectPool } from 'nestjs-slonik';
import { DatabasePool, sql } from 'slonik'
import { OauthDictionnaryDto, TokenCreationDto } from './oauth.dto';

@Injectable()
export class OauthService {
    constructor(
        @InjectPool()
        private readonly pool: DatabasePool
    ) { }

    private async getService(serviceName: string) {
        const res = await this.pool.query(sql<OauthDictionnaryDto>`SELECT * FROM oauth_dictionnary WHERE service = ${serviceName}`)
        const service = res.rows[0]
        return service
    }

    async getLink(serviceName: string): Promise<string> {
        const service = await this.getService(serviceName)

        return `${service.query_code}?client_id=${service.client_id}&redirect_uri=${service.redirect_uri}&scope=${service.scope}`
    }

    async getToken(body: TokenCreationDto): Promise<string> {
        const service = await this.getService(body.serviceName)

        return `${service.query_token}?client_id=${service.client_id}&client_secret=${service.client_secret}&redirect_uri=${service.redirect_uri}&code=${body.code}`
    }
}
