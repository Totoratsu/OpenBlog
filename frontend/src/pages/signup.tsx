import { gql } from 'graphql-request';
import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import Router from 'next/router';

import Footer from '../components/Footer';
import MainContainer from '../components/MainContainer';
import { sendQuery } from '../libs/graphql';

const signup = (): JSX.Element => {
	// User Auth
	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	// Error handlers
	const [err, setError] = useState('');

	async function handleAuth(e: React.MouseEvent<HTMLElement, MouseEvent>) {
		e.preventDefault();

		try {
			const res = await sendQuery(gql`
                mutation {
                    user: createUser(fields:{
                        username: "${username}",
                        email: "${email}",
                        password: "${password}"
                    }){
                        username
                    }
                }
            `);

			Router.push('/');
		} catch (e) {
			setError(e.response.errors[0].message);
		}
	}

	return (
		<MainContainer className="mb-4 pb-4">
			<p className="text-center text-danger mt-4 mb-4">{err}</p>
			<Row className="justify-content-md-center p-4">
				<Col md={8} className="mt-4 mb-4">
					<Form>
						<Form.Group>
							<Form.Label>Username</Form.Label>
							<Form.Control
								type="text"
								placeholder="Username"
								onChange={(e) => setUsername(e.target.value)}
								value={username}
							/>
						</Form.Group>

						<Form.Group controlId="formBasicEmail">
							<Form.Label>Email address</Form.Label>
							<Form.Control
								type="email"
								placeholder="Enter email"
								onChange={(e) => setEmail(e.target.value)}
								value={email}
							/>
						</Form.Group>

						<Form.Group controlId="formBasicPassword">
							<Form.Label>Password</Form.Label>
							<Form.Control
								type="password"
								placeholder="Password"
								onChange={(e) => setPassword(e.target.value)}
								value={password}
							/>
						</Form.Group>

						<Form.Group controlId="formBasicPassword">
							<Form.Label>Confirm Password</Form.Label>
							<Form.Control
								type="password"
								placeholder="Confirm Password"
								onChange={(e) => setConfirmPassword(e.target.value)}
								value={confirmPassword}
							/>
						</Form.Group>

						<Form.Group controlId="formBasicCheckbox">
							<Form.Check type="checkbox" label="Check me out" />
						</Form.Group>

						<Button
							variant="primary"
							type="submit"
							onClick={(e) => handleAuth(e)}
						>
							Signup
						</Button>
					</Form>
				</Col>
			</Row>
			<hr />
			<Footer />
		</MainContainer>
	);
};

export default signup;
