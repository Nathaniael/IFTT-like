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

export class UserRegistrationDto {
    @IsString()
    @IsOptional()
    email?: string

    @IsString()
    @IsOptional()
    username?: string

    @IsString()
    password: string
}