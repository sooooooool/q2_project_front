interface User {
    id: number;
    username: string;
    email: string;
    password: string;
}

interface AuthResponse {
    token: string;
    user: User;
}

export type { User, AuthResponse };