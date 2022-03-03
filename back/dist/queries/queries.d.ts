import { DatabasePool } from 'slonik';
export declare type FieldsFromWhere = {
    pool: DatabasePool;
    selectFields: string[];
    from: string;
    where: string;
    value: string;
};
export declare enum AorREA {
    Action = 0,
    Reaction = 1
}
export declare function qFirstFieldsFromWhere(props: FieldsFromWhere): Promise<unknown>;
export declare function qAllFieldsFromWhere(props: FieldsFromWhere): Promise<readonly unknown[]>;
