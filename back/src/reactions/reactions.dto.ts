import { IsBoolean, IsOptional, IsString, IsUrl } from "class-validator"
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

    @IsBoolean()
    embed: boolean

    @IsOptional()
    @IsString()
    title: string
    
    @IsOptional()
    @IsString()
    fieldname: string

    @IsOptional()
    @IsString()
    fielddescription: string
    
}

export class SmsReactionDto {
    @IsString()
    number: string

    @IsString()
    message: string

}