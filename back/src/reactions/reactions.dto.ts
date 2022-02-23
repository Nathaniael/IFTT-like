import { IsString } from "class-validator"

export class MailReactionDto {
    @IsString()
    username: string

    @IsString()
    recipient: string

    @IsString()
    subject: string

    @IsString()
    body: string
}