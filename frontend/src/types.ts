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

// Redux types
export interface IUserAuth {
	id: number;
	username: string;
	email: string;
}

export interface IAction {
	type: string;
	userInfo?: IUserAuth;
}

export interface InitialState {
	user?: { id: number; username: string; email: string };
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IStoreState {
	user: IUserAuth;
}
