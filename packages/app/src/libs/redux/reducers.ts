import { combineReducers } from 'redux';
import { IAction } from '../../types';

const initialState = {
	id: 0,
	username: 'Guest',
	email: 'guest@test.xyz',
	token: '',
};

const userReducer = (state = initialState, { type, userInfo }: IAction) => {
	switch (type) {
		case 'AUTH':
			return {
				...state,
				id: userInfo.id,
				username: userInfo.username,
				email: userInfo.email,
				token: userInfo.token,
			};
		case 'LOGOUT':
			return {
				...state,
				id: initialState.id,
				username: initialState.username,
				email: initialState.email,
				token: initialState.token,
			};
		case 'RESET':
			return initialState;
		default:
			return state;
	}
};

const reducers = {
	user: userReducer,
	// future reducers ...
};

export default combineReducers(reducers);
