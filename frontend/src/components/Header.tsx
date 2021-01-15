import React from 'react';
import Link from 'next/link';
import { Container, Navbar, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import { IUserAuth } from '../types';

const Header = (): JSX.Element => {
	const user = useSelector((state: { user: IUserAuth }) => state.user);

	function Auth(): JSX.Element {
		return (
			<Row className="d-flex justify-content-between">
				<Col>
					<Link href="/signin">
						<a>Signin</a>
					</Link>
				</Col>
				<Col>
					<Link href="/signup">
						<a>Signup</a>
					</Link>
				</Col>
			</Row>
		);
	}

	function UserPage(): JSX.Element {
		return (
			<p>
				Signed in as:{' '}
				<Link href={`/user/${user.id}`}>
					<a>{user.username}</a>
				</Link>
			</p>
		);
	}

	return (
		<Container className="mb-4">
			<Navbar expand="lg" variant="light">
				<Link href="/">
					<Navbar.Brand>{"Toto's DevBlog"}</Navbar.Brand>
				</Link>

				<Navbar.Toggle />
				<Navbar.Collapse className="justify-content-end">
					<Navbar.Text>
						{user.username === 'Guest' ? <Auth /> : <UserPage />}
					</Navbar.Text>
				</Navbar.Collapse>
			</Navbar>
		</Container>
	);
};

export default Header;
