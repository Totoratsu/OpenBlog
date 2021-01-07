export interface IPost {
	id: number | string;
	title: string;
	description: string;
	content: string;
	author: IUser;
}

export interface IUser {
	id: number | string;
	username: string;
	password: string;
	email: string;
}
