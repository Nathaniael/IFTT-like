export declare class MailReactionDto {
    username: string;
    recipient: string;
    subject: string;
    body: string;
}
export declare class DiscordMsgReactionDto {
    url: string;
    message: string;
    hookusername: string;
    embed: boolean;
    title: string;
    fieldname: string;
    fielddescription: string;
}
export declare class SmsReactionDto {
    number: string;
    message: string;
}
