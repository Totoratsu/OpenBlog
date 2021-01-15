import { combineReducers } from 'redux';

const initialState = {
	id: 0,
	username: '',
	email: '',
};

const userReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case 'AUTH':
			return {
				...state,
				id: payload.id,
				username: payload.username,
				email: payload.email,
			};
		case 'LOGOUT':
			return {
				...state,
				id: initialState.id,
				username: initialState.username,
				email: initialState.email,
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
