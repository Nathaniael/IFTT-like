import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectPool } from 'nestjs-slonik';
import { DatabasePool, sql } from 'slonik'
import { OauthDictionnaryDto, TokenCreationDto } from './oauth.dto';
import { HttpService } from '@nestjs/axios';
import { ReactionsService } from 'src/reactions/reactions.service';

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

        return `${service.query_code}?client_id=${service.client_id}&redirect_uri=${service.redirect_uri}&response_type=code&scope=${service.scope}`
    }

    // async getTokenLink(body: TokenCreationDto): Promise<string> {
    //     const service = await this.getService(body.serviceName)

    //     return `${service.query_token}?client_id=${service.client_id}&client_secret=${service.client_secret}&redirect_uri=${service.redirect_uri}&code=${body.code}&grant_type=authorization_code`
    // }
    // async getToken(body: TokenCreationDto): Promise<string> {
    //     const uri = await this.getTokenLink(body);
    //     const res = await this.httpService.post(uri).toPromise()
    //     const test = res.data
    //     if (test.hasOwnProperty('access_token'))
    //         return test.access_token
    //     const params: string[] = test.split('&')
    //     var map = new Map<string, string>()
    //     params.forEach((elem) => {
    //         map.set(elem.split('=')[0], elem.split('=')[1])
    //     })
    //     return map.get('access_token')
    // }

    async storeToken(token: string, userId: string, service: string) {
        console.log(token)
        console.log(userId)
        console.log(service)
        const tok = await this.pool.query(sql`SELECT * FROM oauth WHERE service = ${service} AND usr_id = ${userId}`)
        if (tok.rowCount === 1) {
            await this.pool.query(sql`UPDATE oauth SET token = ${token} WHERE service = ${service} AND usr_id = ${userId}`)
            return
        }
        await this.pool.query(sql`INSERT INTO oauth (token, refresh_token, duration, generated_at, usr_id, service) VALUES (${token}, 'none', 'none', now(), ${userId}, ${service})`)
    }

    async getTokenForService(userId: string, service: string) {
        const tokenList = await this.pool.query(sql`SELECT token FROM oauth WHERE service = ${service} AND usr_id = ${userId}`)
        if (tokenList.rowCount >= 1) {
            return tokenList.rows[0]
        }
        throw new NotFoundException('no token registered for this user and service')
    }
}
