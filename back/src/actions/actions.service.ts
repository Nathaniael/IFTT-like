import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectPool } from 'nestjs-slonik';
import { DatabasePool } from 'slonik';
import { UserAuth } from 'src/auth/auth.controller';
import { OauthService } from 'src/oauth/oauth.service';
import { HookCreationDto } from './actions.dto';
import { AxiosRequestConfig } from 'axios'

@Injectable()
export class ActionsService {
    constructor(
        @InjectPool()
        private readonly pool: DatabasePool,
        private readonly httpService: HttpService,
        private readonly oauthService: OauthService
    ) { }

    async createHookGitlab(params: HookCreationDto, userId: string) {
        const token = await this.oauthService.getTokenForService(userId, params.service)
        const url = `http://pantharea.fun:8080/webhooks/${params.service}`
        var data = `{"id": ${params.project_id.toString()},"url": ${url},${params.scope}:true}`;
        var config: AxiosRequestConfig = {
            method: 'post',
            url: `https://gitlab.com/api/v4/projects/${params.project_id}/hooks?url=${url}`,
            headers: { 
                'Authorization': `Bearer ${token.token}`, 
                'Content-Type': 'application/json'
            },
            data : data
        };
        console.log(token.token)
        try {
            const a = await this.httpService.post(`https://gitlab.com/api/v4/projects/${params.project_id}/hooks?url=${url}`, data, config ).toPromise()
            console.log(a)
        } catch (error) {
            console.log(error)
        }
    }

    async createAction(params: any, userId: string) {
        switch (params.service) {
            case "Gitlab":
                this.createHookGitlab({project_id: params.project_id, service: "Gitlab", scope: params.scope}, userId)
                break;
            default:
                console.log("no action found")
                break;
        }
    }

}