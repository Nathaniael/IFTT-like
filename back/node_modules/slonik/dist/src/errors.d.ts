import ExtendableError from 'es6-error';
export declare class SlonikError extends ExtendableError {
}
export declare class WrappedPGError extends SlonikError {
    readonly message: string;
    readonly originalError: Error;
    constructor(originalError: Error, message: string);
}
export declare class InvalidConfigurationError extends SlonikError {
}
export declare class InvalidInputError extends SlonikError {
}
export declare class UnexpectedStateError extends SlonikError {
}
export declare class ConnectionError extends SlonikError {
}
export declare class StatementCancelledError extends WrappedPGError {
    constructor(error: Error, message?: string);
}
export declare class StatementTimeoutError extends StatementCancelledError {
    constructor(error: Error);
}
export declare class BackendTerminatedError extends WrappedPGError {
    constructor(error: Error);
}
export declare class TupleMovedToAnotherPartitionError extends WrappedPGError {
    constructor(error: Error, message?: string);
}
export declare class NotFoundError extends SlonikError {
    constructor();
}
export declare class DataIntegrityError extends SlonikError {
    constructor();
}
export declare class IntegrityConstraintViolationError extends WrappedPGError {
    constraint: string;
    constructor(error: Error, constraint: string, message?: string);
}
export declare class NotNullIntegrityConstraintViolationError extends IntegrityConstraintViolationError {
    constructor(error: Error, constraint: string);
}
export declare class ForeignKeyIntegrityConstraintViolationError extends IntegrityConstraintViolationError {
    constructor(error: Error, constraint: string);
}
export declare class UniqueIntegrityConstraintViolationError extends IntegrityConstraintViolationError {
    constructor(error: Error, constraint: string);
}
export declare class CheckIntegrityConstraintViolationError extends IntegrityConstraintViolationError {
    constructor(error: Error, constraint: string);
}
