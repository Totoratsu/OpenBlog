import { gql } from 'graphql-request';
import React from 'react';
import Router from 'next/router';

import MainContainer from '../../components/MainContainer';
import { sendQuery } from '../../libs/graphql';
import { IUser } from '../../types';
import { useDispatch } from 'react-redux';
import { resetStore } from '../../libs/redux/actions';

const UserPage = ({ user }: { user: IUser }): JSX.Element => {
	const dispatch = useDispatch();

	async function handleLogout(): Promise<void> {
		dispatch(resetStore());

		await sendQuery(gql`
			mutation {
				userLogout
			}
		`);

		Router.push('/');
	}

	return (
		<MainContainer>
			<h1 className="text-center">{user.username}</h1>
			<p>{user.email}</p>
			<hr />
			<button onClick={() => Router.push('/add')}>Add new Post</button>
			<hr />
			<button onClick={handleLogout}>Logout</button>
		</MainContainer>
	);
};

UserPage.getInitialProps = async ({
	query: { userId },
}): Promise<{ user: IUser }> => {
	const res = await sendQuery(gql`
    	{
    		User(id: ${userId}) {
    			username
                email
    		}
    	}
    `);

	return {
		user: res.User,
	};
};

export default UserPage;
