import { UserService } from 'src/user/user.service';
import { MailReactionDto, DiscordMsgReactionDto, SmsReactionDto } from './reactions.dto';
export declare class ReactionsController {
    private readonly usersService;
    constructor(usersService: UserService);
    reactionMail(config: MailReactionDto): Promise<void>;
    reactionDiscord(body: DiscordMsgReactionDto): Promise<void>;
    changeUsername(body: {
        newUsername: string;
        user_id: string;
    }): Promise<void>;
    reactionSms(body: SmsReactionDto): Promise<void>;
}
