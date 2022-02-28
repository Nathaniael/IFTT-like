import { IsJSON, IsString } from "class-validator";

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