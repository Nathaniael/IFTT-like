import { Injectable } from '@nestjs/common';
import { InjectPool } from 'nestjs-slonik';
import { DatabasePool, sql } from 'slonik'
import { OauthDictionnaryDto, TokenCreationDto } from './oauth.dto';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class OauthService {
    constructor(
        @InjectPool()
        private readonly pool: DatabasePool,
        private readonly httpService: HttpService,
    ) { }

    private async getService(serviceName: string) {
        const res = await this.pool.query(sql<OauthDictionnaryDto>`SELECT * FROM service WHERE name = ${serviceName}`)
        const service = res.rows[0]
        return service
    }

    async getLink(serviceName: string): Promise<string> {
        const service = await this.getService(serviceName)

        return `${service.query_code}?client_id=${service.client_id}&redirect_uri=${service.redirect_uri}&scope=${service.scope}`
    }

    async getTokenLink(body: TokenCreationDto): Promise<string> {
        const service = await this.getService(body.serviceName)

        return `${service.query_token}?client_id=${service.client_id}&client_secret=${service.client_secret}&redirect_uri=${service.redirect_uri}&code=${body.code}`
    }
    async getToken(body: TokenCreationDto): Promise<string> {
        const uri = await this.getTokenLink(body);
        const res = await this.httpService.post(uri).toPromise()
        const test = res.data as string
        const params: string[] = test.split('&')
        var map: Map<string, string> = new Map<string, string>()
        params.forEach((elem) => {
            map.set(elem.split('=')[0], elem.split('=')[1])
        })
        return map.get('access_token')
    }
}
