import { gql } from 'graphql-request';
import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Footer from '../components/Footer';

import MainContainer from '../components/MainContainer';
import SearchBar from '../components/SearchBar';
import { sendQuery } from '../libs/graphql';
import { IUser } from '../types';

interface IProps {
	users: IUser[];
}

const users = ({ users }: IProps): JSX.Element => {
	const [filteredList, setList] = useState(users);
	const [term, setTerm] = useState('');

	function handleSearchBar(t: string): void {
		setTerm(t);
		if (t === '' || t === ' ') {
			setList(users);
			return;
		}

		setList(users.filter(({ username }) => username.includes(t)));
	}

	return (
		<MainContainer>
			<hr />
			<Row className="justify-content-md-center">
				<Col md={9}>
					<SearchBar
						className="mb-2 pb-2 mt-4 pt-4"
						handler={handleSearchBar}
						value={term}
					/>
				</Col>
			</Row>
			<Row className="mb-4 pb-4 mt-4 pt-4">
				<Col md={2}>
					<aside>
						<h4 className="text-center">Top Users</h4>
						<p>I will implement this later</p>
					</aside>
				</Col>

				<Col>
					<Row>
						{filteredList.map((user, i) => (
							<Col md={4} className="mt-4 mb-4" key={i}>
								<p className="text-center">{user.username}</p>
							</Col>
						))}
					</Row>
				</Col>
			</Row>
			<hr />
			<Footer className="mt-4 pt-4" />
		</MainContainer>
	);
};

export async function getStaticProps(): Promise<{ props: IProps }> {
	const res = await sendQuery(gql`
		{
			Users(limit: 0) {
				id
				username
			}
		}
	`);

	return {
		props: {
			users: res.Users,
		},
	};
}

export default users;
