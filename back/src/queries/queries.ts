import { BadRequestException } from '@nestjs/common';
import { DatabasePool } from 'slonik'

export type FieldsFromWhere = {
    pool: DatabasePool,
    selectFields: string[],
    from: string,
    where: string,
    value: string
};

export enum AorREA {
    Action,
    Reaction
};

function checkIsThereResult(list: any, error: string) {
    if (list.length == 0) {
        throw new BadRequestException(error)
    }
}

export async function qFirstFieldsFromWhere(props: FieldsFromWhere) {
    let listFields = props.selectFields.join(", ")
    let res = await props.pool.query({
        sql: 'SELECT ' + listFields + ' FROM ' + props.from + ' WHERE ' + props.where + ' = $1',
        type: 'SLONIK_TOKEN_SQL',
        values: [props.value] })
    checkIsThereResult(res.rows, "[ERROR] " + props.from + " not found with the given " + props.where)
    return res.rows[0]
}

export async function qAllFieldsFromWhere(props: FieldsFromWhere) {
    let listFields = props.selectFields.join(", ")
    let res = await props.pool.query({
        sql: 'SELECT ' + listFields + ' FROM ' + props.from + ' WHERE ' + props.where + ' = $1',
        type: 'SLONIK_TOKEN_SQL',
        values: [props.value] })
    checkIsThereResult(res.rows, "[ERROR] " + props.from + " not found with the given " + props.where)
    return res.rows
}