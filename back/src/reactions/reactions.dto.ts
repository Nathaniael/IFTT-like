import { IsString, IsUrl } from "class-validator"
import { Url } from "url"

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

export class DiscordMsgReactionDto {
    @IsString()
    url: string

    @IsString()
    message: string

    @IsString()
    hookusername: string
}