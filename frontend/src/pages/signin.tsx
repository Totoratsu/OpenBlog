import { gql } from 'graphql-request';
import Router from 'next/router';
import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import Footer from '../components/Footer';
import MainContainer from '../components/MainContainer';
import { sendQuery } from '../libs/graphql';
import { userAuth } from '../libs/redux/actions';

const signin = (): JSX.Element => {
    const dispatch = useDispatch();

    // User Auth
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Error handlers
    const [err, setError] = useState('');

    async function handleAuth(e: React.MouseEvent<HTMLElement, MouseEvent>) {
        e.preventDefault();

        try {
            const res = await sendQuery(gql`
                mutation {
                    user: userLogin(
                        email: "${email}",
                        password: "${password}"
                    ){
						id
                        username
						email
					}
                }
			`);

            dispatch(
                userAuth({
                    id: res.user.id,
                    username: res.user.username,
                    email: res.user.email,
                })
            );
            Router.push('/');
        } catch (e) {
            console.log(e);
            setError(e.response.errors[0].message);
        }
    }

    return (
        <MainContainer className="mb-4 pb-4">
            <p className="text-center text-danger mt-4 mb-4">{err}</p>
            <Row className="justify-content-md-center p-4">
                <Col md={8} className="mt-4 mb-4">
                    <Form>
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

                        <Button
                            variant="primary"
                            type="submit"
                            onClick={(e) => handleAuth(e)}
                        >
                            Signin
						</Button>
                    </Form>
                </Col>
            </Row>
        </MainContainer>
    );
};

export default signin;
