import { IsOptional, IsString } from "class-validator"

export class UserCreationDto {
    @IsString()
    username: string

    @IsString()
    email: string

    @IsString()
    password: string
}

export class UserDto {
    @IsString()
    id: string

    @IsString()
    email: string

    @IsString()
    password: string

    @IsString()
    username: string

    @IsString()
    created_at: string
}

export class UserLoginDto {
    @IsString()
    email?: string

    @IsString()
    password: string
}

export class OauthCreationDto {
    @IsString()
    token: string

    @IsString()
    refresh_token: string

    @IsString()
    duration: string

    @IsString()
    generated_at: string
}