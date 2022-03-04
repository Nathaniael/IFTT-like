import { Injectable } from '@nestjs/common';
import { access } from 'fs';
import { InjectPool } from 'nestjs-slonik';
import { DatabasePool, sql } from 'slonik'
import { qFirstFieldsFromWhere, qAllFieldsFromWhere, AorREA } from 'src/queries/queries';

@Injectable()
export class UserAreas {
    constructor(
        @InjectPool()
        private readonly pool: DatabasePool
    ) { }

    async getActionOrReactionInfos(area: any, aor: AorREA) {
        // Alternative name for query action or reaction
        const elem_id = aor === AorREA.Action ? area["id_act"] : area["id_react"]
        const elem_name = aor === AorREA.Action ? "action" : "reaction"
        const dico_name = aor === AorREA.Action ? "adictionnary" : "readictionnary"

        // Query elem, then its dico model, then the informations on its service
        var elem = await qFirstFieldsFromWhere({ pool: this.pool, selectFields: ["params", "dico_id"], from: elem_name, where: "id", value: elem_id})
        var dico = await qFirstFieldsFromWhere({ pool: this.pool, selectFields: ["name", "description", "service_id"], from: dico_name, where: "id", value: elem["dico_id"] })
        var service = await qFirstFieldsFromWhere({ pool: this.pool, selectFields: ["name", "logo"], from: "service", where: "id", value: dico["service_id"] })

        // Format the output
        return {
            "name": dico["name"],
            "description": dico["description"],
            "params": JSON.parse(elem["params"]),
            "service": {
                "name": service["name"],
                "logo": service["logo"]
            }
        }   
    }

    async getAreas(userId: string) {
        // Query area from user id
        var areas = await qAllFieldsFromWhere({ pool: this.pool, selectFields: ["id", "id_act", "id_react"], from: "area", where: "usr_id", value: userId })
        
        // Format action & reaction response
        var res = []
        for (const area of areas) {
            var elem = {
                "id": area["id"],
                "action": await this.getActionOrReactionInfos(area, AorREA.Action),
                "reaction": await this.getActionOrReactionInfos(area, AorREA.Reaction)
            }
            res.push(elem)
        }
        return res
    }
}
