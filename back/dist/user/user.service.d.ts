import { DatabasePool } from 'slonik';
import { UserCreationDto, UserRegistrationDto } from './user.dto';
export declare class UserService {
    private readonly pool;
    constructor(pool: DatabasePool);
    registerUser(usr: UserCreationDto): Promise<void>;
    getUser(usr: UserRegistrationDto): Promise<any>;
}
