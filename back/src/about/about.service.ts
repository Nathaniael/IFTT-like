import { Injectable } from '@nestjs/common';
import { InjectPool } from 'nestjs-slonik';
import { DatabasePool, sql } from 'slonik';

@Injectable()
export class AboutService {
    constructor(
        @InjectPool()
        private readonly pool: DatabasePool
    ) {}

    async aboutJson(ip: any) {
        const services = await this.pool.query(sql`SELECT * FROM service`)
        let res = {
            client: {
                host: ip
            },
            server: {
                current_time: Date.now(),
                services: []
            }
        }
        for (const service of services.rows) {
            let qActions = await this.pool.query(sql`SELECT * FROM adictionnary WHERE service_id = ${service.id}`)
            let qReactions = await this.pool.query(sql`SELECT * FROM readictionnary WHERE service_id = ${service.id}`)
            let actionsTab = [];
            let reactionsTab = [];
            for (const action of qActions.rows) {
                const toPush = {
                    name: action.name,
                    description: action.description
                }
                actionsTab.push(toPush)
            }
            for (const reaction of qReactions.rows) {
                const toPush = {
                    name: reaction.name,
                    description: reaction.description
                }
                reactionsTab.push(toPush)
            }
            res.server.services.push({
                name: service.name,
                actions: actionsTab,
                reactions: reactionsTab
            })
        }
        return res;
    }
}
