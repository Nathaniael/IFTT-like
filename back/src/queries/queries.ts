import { BadRequestException } from '@nestjs/common';
import { DatabasePool } from 'slonik'

export type DefaultFieldsFromWhere = {
    pool: DatabasePool,
    from: string,
    where: string,
    value: string
};

export type SelectFieldsFromWhere = DefaultFieldsFromWhere & {
    selectFields: string[]
}

export enum AorREA {
    Action,
    Reaction
};

function checkIsThereResult(res: any, error: string) {
    if (res.rowCount == 0) {
        console.log("EXCEPT " + error)
        throw new BadRequestException(error)
    }
}

export async function qFirstFieldsFromWhere(props: SelectFieldsFromWhere) {
    let listFields = props.selectFields.join(", ")
    let res = await props.pool.query({
        sql: 'SELECT ' + listFields + ' FROM ' + props.from + ' WHERE ' + props.where + ' = $1',
        type: 'SLONIK_TOKEN_SQL',
        values: [props.value] })
    checkIsThereResult(res, "[ERROR] " + props.from + " not found with the given " + props.where)
    return res.rows[0]
}

export async function qAllFieldsFromWhere(props: SelectFieldsFromWhere) {
    let listFields = props.selectFields.join(", ")
    let res = await props.pool.query({
        sql: 'SELECT ' + listFields + ' FROM ' + props.from + ' WHERE ' + props.where + ' = $1',
        type: 'SLONIK_TOKEN_SQL',
        values: [props.value] })
    checkIsThereResult(res, "[ERROR] " + props.from + " not found with the given " + props.where)
    return res.rows
}

export async function qDeleteFieldsFromWhere(props: DefaultFieldsFromWhere) {
    let res = await props.pool.query({
        sql: 'DELETE FROM ' + props.from + ' WHERE ' + props.where + ' = $1',
        type: 'SLONIK_TOKEN_SQL',
        values: [props.value] })
    checkIsThereResult(res, "[ERROR] " + props.from + " not found with the given " + props.where)
    return res.rows
}