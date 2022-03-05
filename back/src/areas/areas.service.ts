import { HttpModule, HttpService } from '@nestjs/axios';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectPool } from 'nestjs-slonik';
import { DatabasePool, sql } from 'slonik';
import { ActionsService } from 'src/actions/actions.service';
import { UserAuth } from 'src/auth/auth.controller';
import { AreaCreationDto, DicoDto } from './areas.dto';
@Injectable()
export class AreasService {
    constructor(
        @InjectPool()
        private readonly pool: DatabasePool,
        private readonly httpService: HttpService,
        private readonly actionsService: ActionsService
    ) { }

    async callReaction(params: string, type: string) {
        var action = await this.pool.query(sql`SELECT * FROM action WHERE params = ${params} AND type = ${type}`)
        if (action.rowCount === 0) {
            return
        }
        let area = await this.pool.query(sql`SELECT * FROM area WHERE id_act = ${action.rows[0].id}`)
        for (var elem of area.rows) {
            let reaction = await this.pool.query(sql`SELECT * FROM reaction WHERE id = ${elem.id_react}`)
            let data = JSON.parse(reaction.rows[0].params.toString())
            this.httpService.post(`http://localhost:8080/reactions/${reaction.rows[0].reaction_route}`, data).toPromise()
        }
    }

    checkBodyCreateArea(body: AreaCreationDto) {
        if (body.action_id === undefined || body.reaction_id === undefined)
            throw new BadRequestException("Missing action or reaction")
        Object.keys(body.action_params).forEach(key => {
            var value = body.action_params[key]
            if (value === null || value === "")
                throw new BadRequestException("Bad value for: " + JSON.stringify(key))
        });
        Object.keys(body.reaction_params).forEach(key => {
            var value = body.reaction_params[key]
            if (value === null || value === "")
                throw new BadRequestException("Bad value for: " + JSON.stringify(key))
        });
    }

    async createArea(userId: string, body: AreaCreationDto) {
        this.checkBodyCreateArea(body)
        console.log("Body:", body)
        const reaction_dico = await this.pool.query(sql<DicoDto>`SELECT * FROM readictionnary WHERE id = ${body.reaction_id}`)
        const reaction_service = await this.pool.query(sql`SELECT * FROM service WHERE id = ${reaction_dico.rows[0].service_id}`)
        const action_dico = await this.pool.query(sql<DicoDto>`SELECT * FROM adictionnary WHERE id = ${body.action_id}`)
        console.log(body.action_params)
        console.log(action_dico.rows[0].params)
        console.log(body.action_id)
        const action = await this.pool.query(sql`INSERT INTO action (params, type, dico_id)
        VALUES (${JSON.stringify(body.action_params)}, ${JSON.stringify(action_dico.rows[0].params)},${body.action_id}) RETURNING id;`)
        console.log("l'action créé", action)
        const action_service = await this.pool.query(sql`SELECT * FROM service WHERE id = ${action_dico.rows[0].service_id}`)
        this.actionsService.createAction(body.action_params, action_service.rows[0].name.toString(), userId, action_dico.rows[0].name)
        const reaction = await this.pool.query(sql`INSERT INTO reaction (params, type, reaction_route,dico_id)
        VALUES (${JSON.stringify(body.reaction_params)}, ${JSON.stringify(reaction_dico.rows[0].params)},${reaction_service.rows[0].name} ,${body.reaction_id}) RETURNING id;`)

        const area = await this.pool.query(sql`INSERT INTO area (
            id_act,
            id_react,
            usr_id) VALUES (
                ${action.rows[0].id},
                ${reaction.rows[0].id},
                ${userId})`)
    }

    async deleteArea(id: number) {
        const deleted_area = await this.pool.query(sql`DELETE FROM area WHERE id = ${id}`)
    }

    async getAreaByUser(usrId: string) {
        const areas =  await this.pool.query(sql`SELECT * FROM area WHERE usr_id = ${usrId}`)
        return areas.rows
    }
}
