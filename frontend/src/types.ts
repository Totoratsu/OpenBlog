export interface Post {
    id: number;
    title: string;
    description: string;
    content: string;
    author: User;
}

export interface User {
    id: number;
    username: string;
    password: string;
    email: string;
}