import { DatabasePool } from 'slonik';
import { UserCreationDto } from './user.dto';
export declare class UserService {
    private readonly pool;
    constructor(pool: DatabasePool);
    registerUser(usr: UserCreationDto): Promise<void>;
    getUser(usr: UserCreationDto): Promise<import("slonik").QueryResultRow>;
}
