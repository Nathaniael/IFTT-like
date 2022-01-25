"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEnvironmentVariables = exports.EnvironmentVariables = exports.BackendEnvironment = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
var BackendEnvironment;
(function (BackendEnvironment) {
    BackendEnvironment["Local"] = "local";
    BackendEnvironment["Development"] = "development";
    BackendEnvironment["Production"] = "production";
    BackendEnvironment["Test"] = "test";
})(BackendEnvironment = exports.BackendEnvironment || (exports.BackendEnvironment = {}));
class EnvironmentVariables {
}
__decorate([
    (0, class_validator_1.IsEnum)(BackendEnvironment),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "BACKEND_ENVIRONMENT", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "CORS_ORIGIN", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], EnvironmentVariables.prototype, "BACKEND_PORT", void 0);
exports.EnvironmentVariables = EnvironmentVariables;
function validateEnvironmentVariables(config) {
    const validatedConfig = (0, class_transformer_1.plainToClass)(EnvironmentVariables, config, {
        enableImplicitConversion: true,
    });
    const errors = (0, class_validator_1.validateSync)(validatedConfig, {
        skipMissingProperties: false,
    });
    if (errors.length > 0) {
        throw new Error(errors.toString());
    }
    return validatedConfig;
}
exports.validateEnvironmentVariables = validateEnvironmentVariables;
//# sourceMappingURL=config.js.map