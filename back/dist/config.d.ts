export declare enum BackendEnvironment {
    Local = "local",
    Development = "development",
    Production = "production",
    Test = "test"
}
export declare class EnvironmentVariables {
    JWT_SECRET: string;
    BACKEND_ENVIRONMENT: BackendEnvironment;
    CORS_ORIGIN: string;
    BACKEND_PORT: number;
}
export declare function validateEnvironmentVariables(config: Record<string, unknown>): EnvironmentVariables;
