import { IsJSON, IsString, IsNumber } from "class-validator";

export class AreaCreationDto {
    @IsString()
    user_id: string

    @IsString()
    action_id: string

    @IsJSON()
    action_params: JSON

    @IsString()
    reaction_id: string

    @IsJSON()
    reaction_params: JSON
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