import { HttpModule, HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectPool } from 'nestjs-slonik';
import { DatabasePool, sql } from 'slonik';
import { AreaCreationDto } from './areas.dto';
@Injectable()
export class AreasService {
    constructor(
        @InjectPool()
        private readonly pool: DatabasePool,
        private readonly httpService: HttpService
    ) { }

    async callReaction(service: string, type: string, data: any) {
        const areas = await this.pool.query(sql`SELECT * FROM area WHERE r_service = ${service} AND r_type = ${type} AND r_params = ${JSON.stringify(data)}`)
        for (const elem of areas.rows) {
            let reaction = await this.pool.query(sql`SELECT * FROM reaction WHERE id = ${elem.id_react}`)
            console.log(reaction.rows[0], "SHEESH")
            this.httpService.post(`http://localhost:8080/reactions/${reaction.rows[0].reaction_route}`).toPromise()
        }
    }

    async createArea(userId: string, body: AreaCreationDto) {
        const action = await this.pool.query(sql`INSERT INTO action (service_name, action_type, params) VALUES (${body.action_service_name}, ${body.action_type}, ${JSON.stringify(body.action_params)}) RETURNING id;`)
        const reaction = await this.pool.query(sql`INSERT INTO reaction (service_name, reaction_type, params, reaction_route) VALUES (${body.reaction_service_name}, ${body.reaction_type}, ${JSON.stringify(body.reaction_params)}, ${body.reaction_route}) RETURNING id;`)

        const area = await this.pool.query(sql`INSERT INTO area (r_service,
            r_type,
            r_params,
            id_act,
            id_react,
            usr_id) VALUES (${body.action_service_name},
                ${body.action_type},
                ${JSON.stringify(body.action_params)},
                ${action.rows[0].id},
                ${reaction.rows[0].id},
                ${userId})`)
        console.log(action, reaction, area)
    }
}
