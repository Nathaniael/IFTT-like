import { IsJSON, IsString, IsNumber } from "class-validator";

export class AreaCreationDto {
    @IsString()
    user_id: string

    @IsString()
    action_id: string

    @IsString()
    action_params: string

    @IsString()
    reaction_id: string

    @IsString()
    reaction_params: string
}

export class DicoDto {
    @IsString()
    params: string
    
    @IsString()
    name: string


    @IsString()
    description: string

    @IsNumber()
    service_id: string

    @IsNumber()
    id: string

    @IsString()
    reaction_route: string
}

export class AreaId {
    @IsNumber()
    id: number
}