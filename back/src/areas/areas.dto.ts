import { IsJSON, IsString } from "class-validator";

export class AreaCreationDto {

    @IsString()
    action_service_name: string

    @IsString()
    action_type: string

    @IsJSON()
    action_params: JSON

    @IsString()
    reaction_service_name: string

    @IsString()
    reaction_type: string

    @IsJSON()
    reaction_params: JSON

    @IsString()
    reaction_route: string
}