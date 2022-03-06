import { HttpModule, HttpService } from '@nestjs/axios';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectPool } from 'nestjs-slonik';
import { DatabasePool, sql } from 'slonik';
import { ActionsService } from 'src/actions/actions.service';
import { UserAuth } from 'src/auth/auth.controller';
import { AreaCreationDto, DicoDto } from './areas.dto';
import { qFirstFieldsFromWhere, qDeleteFieldsFromWhere } from 'src/queries/queries';

@Injectable()
export class AreasService {
    constructor(
        @InjectPool()
        private readonly pool: DatabasePool,
        private readonly httpService: HttpService,
        private readonly actionsService: ActionsService,
    ) { }

    async callReaction(params: string) {
        var action = await this.pool.query(sql`SELECT * FROM action WHERE params = ${params} `)
        if (action.rowCount === 0) {
            console.log("PARAMS", params)
            return
        }
        console.log(action.rows)
        for (var test of action.rows) {
            let area = await this.pool.query(sql`SELECT * FROM area WHERE id_act = ${test.id}`)
            console.log(area)
            for (var elem of area.rows) {
                console.log("REACTION")
                let reaction = await this.pool.query(sql`SELECT * FROM reaction WHERE id = ${elem.id_react}`)
                console.log(reaction)
                let data = JSON.parse(reaction.rows[0].params.toString())
                this.httpService.post(`http://pantharea.fun:8080/reactions/${reaction.rows[0].reaction_route}`, data).toPromise()
            }
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

        const reaction_dico = await qFirstFieldsFromWhere({ pool: this.pool, selectFields: ["service_id", "params"], from: "readictionnary", where: "id", value: body.reaction_id});
        const reaction_service = await qFirstFieldsFromWhere({ pool: this.pool, selectFields: ["name"], from: "service", where: "id", value: reaction_dico["service_id"]})
        const action_dico = await qFirstFieldsFromWhere({ pool: this.pool, selectFields: ["service_id", "params", "name"], from: "adictionnary", where: "id", value: body.action_id})
        const action = await this.pool.query(sql<{id: number}>`INSERT INTO action (params, dico_id)
        VALUES (${JSON.stringify(body.action_params)}, ${body.action_id}) RETURNING id;`)

        const action_service = await qFirstFieldsFromWhere({ pool: this.pool, selectFields: ["*"], from: "service", where: "id", value: action_dico["service_id"]})

        await this.actionsService.createAction(body.action_params, action_service["name"].toString(), userId, action_dico["name"], action.rows[0])

        const reaction = await this.pool.query(sql<{id: number}>`INSERT INTO reaction (params, reaction_route,dico_id)
        VALUES (${JSON.stringify(body.reaction_params)}, ${reaction_service["name"]} ,${body.reaction_id}) RETURNING id;`)
        console.log("EH JE PASSE ICI")
        const reaction_params = await this.createReaction(reaction_service["name"], userId, reaction.rows[0].id)
        console.log("EH JE PASSE ICI AUSSI ")
        const area = await this.pool.query(sql`INSERT INTO area (
            id_act,
            id_react,
            usr_id) VALUES (
                ${action.rows[0].id},
                ${reaction.rows[0].id},
                ${userId})`)
    }

    async createReaction(serviceName: string, user_id: string, id: number) {
        console.log(id)
        if (serviceName === "Area") {
            const reaction = await this.pool.query(sql<{params: string}>`SELECT params FROM reaction WHERE id = ${id}`)
            const tmp = JSON.parse(reaction.rows[0].params)
            tmp.user_id = user_id
            await this.pool.query(sql`UPDATE reaction SET params = ${JSON.stringify(tmp)} WHERE id = ${id}`)
            return
        }
    }

    async deleteArea(id: string) {
        await qDeleteFieldsFromWhere({ pool: this.pool, from: "area", where: "id", value: id})
    }

    async getAreaByUser(usrId: string) {
        const areas =  await this.pool.query(sql`SELECT * FROM area WHERE usr_id = ${usrId}`)
        return areas.rows
    }
}
