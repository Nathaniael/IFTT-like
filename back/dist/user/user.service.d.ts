import { DatabasePool } from 'slonik';
import { UserCreationDto, UserLoginDto } from './user.dto';
export declare class UserService {
    private readonly pool;
    constructor(pool: DatabasePool);
    registerUser(usr: UserCreationDto): Promise<void>;
    getUser(usr: UserLoginDto): Promise<any>;
}
