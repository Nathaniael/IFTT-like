"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTypeOverrides = void 0;
const type_overrides_1 = __importDefault(require("pg/lib/type-overrides"));
const postgres_array_1 = require("postgres-array");
const createTypeOverrides = async (connection, typeParsers) => {
    const typeOverrides = new type_overrides_1.default();
    if (typeParsers.length === 0) {
        return typeOverrides;
    }
    const typeNames = typeParsers.map((typeParser) => {
        return typeParser.name;
    });
    const postgresTypes = (await connection.query('SELECT oid, typarray, typname FROM pg_type WHERE typname = ANY($1::text[])', [
        typeNames,
    ])).rows;
    for (const typeParser of typeParsers) {
        const postgresType = postgresTypes.find((maybeTargetPostgresType) => {
            return maybeTargetPostgresType.typname === typeParser.name;
        });
        if (!postgresType) {
            throw new Error('Database type "' + typeParser.name + '" not found.');
        }
        typeOverrides.setTypeParser(postgresType.oid, (value) => {
            return typeParser.parse(value);
        });
        if (postgresType.typarray) {
            typeOverrides.setTypeParser(postgresType.typarray, (arrayValue) => {
                return (0, postgres_array_1.parse)(arrayValue)
                    .map((value) => {
                    return typeParser.parse(value);
                });
            });
        }
    }
    return typeOverrides;
};
exports.createTypeOverrides = createTypeOverrides;
//# sourceMappingURL=createTypeOverrides.js.map