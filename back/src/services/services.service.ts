import { Injectable } from '@nestjs/common';
import { InjectPool } from 'nestjs-slonik';
import { DatabasePool, sql } from 'slonik';

@Injectable()
export class ServicesService {
    constructor(
        @InjectPool()
        private readonly pool: DatabasePool
    ) {}

    async getServices() {
        let services = await this.pool.query(sql`SELECT * FROM service`)
        let res = []
        let idService;
        for (const service of services.rows) {
            idService = service.id
            res.push({
                "id": service.id,
                "name": service.name,
                "logo": service.logo,
                "actions": await this.getActionsByServiceId(idService),
                "reactions": await this.getReactionsByServiceId(idService),
            })
        }
        return res;
    }

    async getActionsByServiceId(id: number) {
        let actions = await this.pool.query(sql`SELECT * FROM adictionnary WHERE service_id = ${id}`)
        return actions.rows;
    }

    async getReactionsByServiceId(id: number) {
        let reactions = await this.pool.query(sql`SELECT * FROM readictionnary WHERE service_id = ${id}`)
        return reactions.rows;
    }
}
