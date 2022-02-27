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
        return services.rows;
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
