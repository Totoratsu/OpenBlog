import { Request, Response } from 'express';

import { User } from '../entities/UserEntity';

export interface MyContext {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	req: Request | any;
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
