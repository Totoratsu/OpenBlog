interface action {
	type: string;
}

export const uyserAuth = (): action => ({ type: 'AUTH' });

export const userLogout = (): action => ({ type: 'LOGOUT' });

export const resetStore = (): action => ({ type: 'RESET' });
