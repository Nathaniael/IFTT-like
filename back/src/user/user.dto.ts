import { IsString } from "class-validator"

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