import { DatabasePool } from 'slonik';
export declare class AboutService {
    private readonly pool;
    constructor(pool: DatabasePool);
    aboutJson(ip: any): Promise<{
        client: {
            host: any;
        };
        server: {
            current_time: number;
            services: any[];
        };
    }>;
}
