import { IsOptional, IsString } from "class-validator"

export class OauthDictionnaryDto {

    @IsString()
    service: string

    @IsString()
    query_code: string

    @IsString()
    query_token: string

    @IsString()
    @IsOptional()
    logo?: string

    @IsString()
    client_id: string

    @IsString()
    client_secret: string

    @IsString()
    redirect_uri: string

    @IsString()
    scope: string
}

export class TokenCreationDto {
    @IsString()
    token: string

    @IsString()
    serviceName: string
}