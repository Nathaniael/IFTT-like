import { IsEnum, IsNotEmpty, IsNumber, IsString, validateSync } from 'class-validator'
import { plainToClass, Type } from 'class-transformer'


export enum BackendEnvironment {
    Local = 'local',
    Development = 'development',
    Production = 'production',
    Test = 'test',
}


export class EnvironmentVariables {
    JWT_SECRET: string;

    @IsEnum(BackendEnvironment)
    BACKEND_ENVIRONMENT: BackendEnvironment;

    @IsNotEmpty()
    @IsString()
    CORS_ORIGIN: string;

    @Type(() => Number)
    @IsNumber()
    BACKEND_PORT: number;
}

export function validateEnvironmentVariables(config: Record<string, unknown>) {
    const validatedConfig = plainToClass(EnvironmentVariables, config, {
        enableImplicitConversion: true,
    });
    const errors = validateSync(validatedConfig, {
        skipMissingProperties: false,
    });

    if (errors.length > 0) {
        throw new Error(errors.toString());
    }
    return validatedConfig;
}
