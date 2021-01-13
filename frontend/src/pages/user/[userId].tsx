import { gql } from 'graphql-request';
import React from 'react';

import Footer from '../../components/Footer';
import MainContainer from '../../components/MainContainer';
import { sendQuery } from '../../libs/graphql';
import { IUser } from '../../types';

const UserPage = ({ user }: { user: IUser }): JSX.Element => {
	return (
		<MainContainer>
			<h1 className="text-center">{user.username}</h1>
			<p>{user.email}</p>
			<hr />
			<Footer />
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

	console.log(res);

	return {
		user: res.User,
	};
};

export default UserPage;
