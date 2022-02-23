export declare class WebhooksService {
    getGithubActionType(body: any): string;
    getGithubActionData(body: any): {
        user: string;
        repo?: string;
        organization?: string;
    };
}
