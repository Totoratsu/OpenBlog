import React from 'react';
import { Container, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = (): JSX.Element => {
	return (
		<Container className="mb-4">
			<Navbar expand="lg" variant="light">
				<Navbar.Brand href="#home">{"Toto's DevBlog"}</Navbar.Brand>

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
