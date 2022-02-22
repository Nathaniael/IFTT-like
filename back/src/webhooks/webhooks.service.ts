import { Injectable } from '@nestjs/common';

@Injectable()
export class WebhooksService {
    getGithubActionType(body: any): string {
        return body.type
    }

    getGithubActionData(body: any): { user: string, repo?: string, organization?: string } {
        return body.data
    }
}
