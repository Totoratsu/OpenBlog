import { Request, Response } from 'express';

import { User } from '../entities/UserEntity';

export interface MyContext {
	req: Request & {
		session: {
			// Cookie info
			userId: string | number;
		};
	};
	res: Response;
}

export interface IUser {
	id?: number;
	username: string;
	email: string;
	password: string;
}

export interface IPost {
	id?: number;
	title: string;
	description: string;
	content: string;
	author: User;
}
