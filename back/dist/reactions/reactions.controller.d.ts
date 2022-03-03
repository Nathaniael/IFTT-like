import { MailReactionDto, DiscordMsgReactionDto, SmsReactionDto } from './reactions.dto';
export declare class ReactionsController {
    reactionMail(config: MailReactionDto): Promise<void>;
    reactionDiscord(body: DiscordMsgReactionDto): Promise<void>;
    reactionSms(body: SmsReactionDto): Promise<void>;
}
