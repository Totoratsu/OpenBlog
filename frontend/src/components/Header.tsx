import React from 'react';
import Link from 'next/link';
import { Container, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = (): JSX.Element => {
	return (
		<Container className="mb-4">
			<Navbar expand="lg" variant="light">
				<Link href="/">
					<Navbar.Brand>{"Toto's DevBlog"}</Navbar.Brand>
				</Link>

				<Navbar.Toggle />
				<Navbar.Collapse className="justify-content-end">
					<Navbar.Text>
						Signed in as: <a href="#login">Mark Otto</a>
					</Navbar.Text>
				</Navbar.Collapse>
			</Navbar>
		</Container>
	);
};

export default Header;
