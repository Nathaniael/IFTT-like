import { MailReactionDto, DiscordMsgReactionDto } from './reactions.dto';
export declare class ReactionsController {
    printstp(config: MailReactionDto): Promise<void>;
    actionDiscord(req: any, body: DiscordMsgReactionDto): Promise<void>;
}
