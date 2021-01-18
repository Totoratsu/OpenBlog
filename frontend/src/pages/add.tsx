import { gql } from 'graphql-request';
import React, { useState } from 'react';
import { Col, Row, Form, Button } from 'react-bootstrap';
import Markdown from 'react-markdown';
import { useSelector } from 'react-redux';
import Router from 'next/router';

import MainContainer from '../components/MainContainer';
import { sendQuery } from '../libs/graphql';
import { IUserAuth } from '../types';

const add = (): JSX.Element => {
	const user = useSelector((state: { user: IUserAuth }) => state.user);

	const [err, setError] = useState('');

	const [content, setContent] = useState('');
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');

	async function handleCreatePost(): Promise<void> {
		try {
			await sendQuery(
				gql`
					mutation MyMutation(
						$id: ID!
						$description: String!
						$content: String!
						$title: String!
					) {
						createPost(
							fields: {
								title: $title
								description: $description
								content: $content
								author: $id
							}
						) {
							id
						}
					}
				`,
				{
					title,
					description,
					content,
					id: user.id,
				},
				user.token
			);

			Router.push('/');
		} catch (e) {
			setError(e.response.errors[0].message);
		}
	}

	return (
		<MainContainer>
			<p className="text-center text-danger mt-4 mb-4">{err}</p>
			<Row className="d-flex justify-content-between">
				<Col md={6}>
					<Form>
						<Form.Group controlId="">
							<Form.Label>Post Content in MarkDown:</Form.Label>
							<br />
							<Form.Control
								size="lg"
								type="text"
								placeholder="Title"
								onChange={(e) => setTitle(e.target.value)}
								value={title}
							/>
							<br />
							<Form.Control
								placeholder="Description"
								as="textarea"
								rows={3}
								onChange={(e) => setDescription(e.target.value)}
								value={description}
							/>
							<br />
							<Form.Control
								placeholder="Post content ..."
								as="textarea"
								rows={15}
								onChange={(e) => setContent(e.target.value)}
								value={content}
							/>
							<br />
							<Button variant="success" onClick={handleCreatePost}>
								Add new Post
							</Button>
						</Form.Group>
					</Form>
				</Col>
				<Col md={6}>
					<h1 className="text-center">{title}</h1>
					<p className="text-center text-muted">{description}</p>
					<Markdown escapeHtml={true} source={content} />
				</Col>
			</Row>
		</MainContainer>
	);
};

export default add;
