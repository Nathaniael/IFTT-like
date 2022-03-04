export declare class UserCreationDto {
    username: string;
    email: string;
    password: string;
    image: string;
}
export declare class UserDto {
    id: string;
    email: string;
    password: string;
    username: string;
    created_at: string;
}
export declare class UserLoginDto {
    email?: string;
    password: string;
}
export declare class OauthCreationDto {
    token: string;
    refresh_token: string;
    duration: string;
    generated_at: string;
}
export declare class Username {
    username: string;
}
