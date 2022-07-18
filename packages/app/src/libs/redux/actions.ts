import { IAction, IUserAuth } from '../../types';

export const userAuth = (userInfo: IUserAuth): IAction => ({
	type: 'AUTH',
	userInfo,
});

export const userLogout = (): IAction => ({ type: 'LOGOUT' });

export const resetStore = (): IAction => ({ type: 'RESET' });
