import { DatabasePool } from 'slonik';
export declare type DefaultFieldsFromWhere = {
    pool: DatabasePool;
    from: string;
    where: string;
    value: string;
};
export declare type SelectFieldsFromWhere = DefaultFieldsFromWhere & {
    selectFields: string[];
};
export declare enum AorREA {
    Action = 0,
    Reaction = 1
}
export declare function qFirstFieldsFromWhere(props: SelectFieldsFromWhere): Promise<unknown>;
export declare function qAllFieldsFromWhere(props: SelectFieldsFromWhere): Promise<readonly unknown[]>;
export declare function qDeleteFieldsFromWhere(props: DefaultFieldsFromWhere): Promise<readonly unknown[]>;
