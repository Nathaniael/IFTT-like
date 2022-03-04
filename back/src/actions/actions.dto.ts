import { IsBoolean, IsJSON, IsNumber, IsString } from "class-validator";

export class HookCreationDto {
    @IsNumber()
    project_id: number

    @IsString()
    service: string

    @IsString()
    scope: string
}