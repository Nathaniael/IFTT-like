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

    async createHookGitlab(params: HookCreationDto, userId: string, action_name:string) {
        let event: string
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
        console.log(token.token)
        try {
            const a = await this.httpService.post(`https://gitlab.com/api/v4/projects/${params.project_id}/hooks?url=${url}`, data, config ).toPromise()
            console.log(a)
        } catch (error) {
            console.log(error)
        }
    }

    async createAction(params: any, service:string ,userId: string, action_name: string) {
        switch (service) {
            case "Gitlab":
                await this.createHookGitlab({project_id: params.project_id, service: "Gitlab", scope: params.scope}, userId, action_name)
                break;
            default:
                console.log("no action found")
                break;
        }
    }

}