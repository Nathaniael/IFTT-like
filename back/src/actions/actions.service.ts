import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectPool } from 'nestjs-slonik';
import { DatabasePool, sql } from 'slonik';
import { UserAuth } from 'src/auth/auth.controller';
import { OauthService } from 'src/oauth/oauth.service';
import { HookCreationDto } from './actions.dto';
import { AxiosRequestConfig } from 'axios'
import { Cron } from '@nestjs/schedule';


@Injectable()
export class ActionsService {
    constructor(
        @InjectPool()
        private readonly pool: DatabasePool,
        private readonly httpService: HttpService,
        private readonly oauthService: OauthService
    ) { }

    async createHookGitlab(params: HookCreationDto, userId: string, action_name:string) {
        let event: string
        console.log(action_name)
        switch(action_name) {
            case "Push event":
                event = "push_events"
            case "Merge request event":
                event = "merge_requests_events"
            case "Issues event":
                event = "issues_events"
            case "Deployment event":
                event = "deployment_events"
            case "Confidential issues event":
                event = "confidential_issues_events"
            default:
                break
        }
        const token = await this.oauthService.getTokenForService(userId, params.service)
        const url = `http://pantharea.fun:8080/webhooks/${params.service}`
        var data = `{"id": ${params.project_id.toString()},"url": ${url},${event}:true}`;
        var config: AxiosRequestConfig = {
            method: 'post',
            url: `https://gitlab.com/api/v4/projects/${params.project_id}/hooks?url=${url}`,
            headers: {
                'Authorization': `Bearer ${token.token}`,
                'Content-Type': 'application/json'
            },
            data : data
        };
        try {
            const a = await this.httpService.post(`https://gitlab.com/api/v4/projects/${params.project_id}/hooks?url=${url}`, data, config ).toPromise()
        } catch (error) {
            console.log(error)
        }
    }

    //city:string,previous_value:string,service:string
    async updateWeather() {
        const areas = await this.pool.query(sql<{id: number, params: string}>`SELECT id, params FROM action WHERE strpos(action.params, 'Weather') != 0`)
        for (const elem of areas.rows) {
            const params = JSON.parse(elem.params)
            const res = await this.httpService.get(`http://api.weatherapi.com/v1/current.json?key=bc3eb83b600343afb4e184537220503&q=${params.city}&aqi=no`).toPromise()
            if (params.previous_value !== res.data.current.temp_c) {
                const test = params
                test.previous_value = res.data.current.temp_c
                this.pool.query(sql`UPDATE action SET params = ${JSON.stringify(test)} WHERE id = ${elem.id}`)
                const reactions = await this.pool.query(sql`SELECT * FROM reaction INNER JOIN area ON area.id_react = reaction.id WHERE area.id_act = ${elem.id}`)
                for (const reaction of reactions.rows) {
                    console.log (reaction)
                    await this.httpService.post(`http://localhost:8080/reactions/${reaction.reaction_route}`, reaction.params).toPromise()
                }
            }
        }
    }

    async createWeather(params: any, id) {
        console.log(params)
        const res = await this.httpService.get(`http://api.weatherapi.com/v1/current.json?key=bc3eb83b600343afb4e184537220503&q=${params.city}&aqi=no`).toPromise()

        const tmp = params
        tmp.previous_value = res.data.current.temp_c
        const newparams = JSON.stringify(tmp)
        await this.pool.query(sql`UPDATE action SET params = ${newparams} WHERE id = ${id}`)
    }

    async createArea(id: number, action_name: string, user_id: string, param: any) {
        console.log(action_name)
        var params = JSON.stringify({action_type: action_name, user_id: user_id})
        if (action_name === "Area deleted") {
            params = JSON.stringify({action_type: action_name, user_id: user_id, id: param.id})
        }
        if (action_name === "Detect number of areas") {
            params = JSON.stringify({action_type: action_name, user_id: user_id, nb: param.nb})
        }
        this.pool.query(sql`UPDATE action SET params = ${params} WHERE id = ${id}`)
    }

    async createAction(params: any, service:string ,userId: string, action_name: string, action: {id: number}) {
        console.log(service)
        switch (service) {
            case "Gitlab":
                await this.createHookGitlab({project_id: params.project_id, service: "Gitlab", scope: params.scope}, userId, action_name)
                break;
            case "Weather":
                await this.createWeather(params, action.id)
            case "Area":
                this.createArea(action.id, action_name, userId, params)
                break
            default:
                console.log("no action found")
                break;
        }
    }

}