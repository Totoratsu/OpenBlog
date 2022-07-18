import { gql } from 'graphql-request';
import React, { useState } from 'react';
import { Col, Row, Form, Button, Card } from 'react-bootstrap';
import Markdown from 'react-markdown';
import { useSelector } from 'react-redux';
import Router from 'next/router';

import MainContainer from '../components/MainContainer';
import { sendQuery } from '../libs/graphql';
import { IUserAuth } from '../types';
import Link from 'next/link';

const add = (): JSX.Element => {
	const user = useSelector((state: { user: IUserAuth }) => state.user);

	const [err, setError] = useState('');

	const [title, setTitle] = useState('Lorems Post');
	const [description, setDescription] = useState(
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
	);
	const [content, setContent] = useState(
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.'
	);

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
			<div className="mb-4 mt-4 p-4">
				<h2>Write a post in Markdown!</h2>
				<Link href="https://markdown-guide.readthedocs.io/en/latest/basics.html">
					<a target="blank">Markdown Docs</a>
				</Link>
			</div>

			<hr />
			<p className="text-center text-danger mt-4 mb-4">{err}</p>
			<Row className="d-flex justify-content-between mt-4">
				<Col md={6}>
					<h3 className="text-center">Content</h3>
					<Form>
						<Form.Group controlId="">
							<br />
							<Form.Label>Title</Form.Label>
							<Form.Control
								size="lg"
								type="text"
								placeholder="Title"
								onChange={(e) => setTitle(e.target.value)}
								value={title}
							/>
							<br />
							<Form.Label>Description</Form.Label>
							<Form.Control
								placeholder="Description"
								as="textarea"
								rows={3}
								onChange={(e) => setDescription(e.target.value)}
								value={description}
							/>
							<br />
							<Form.Label>Content</Form.Label>
							<Form.Control
								placeholder="Post content ..."
								as="textarea"
								rows={15}
								onChange={(e) => setContent(e.target.value)}
								value={content}
							/>
							<br />
							<Button variant="primary" onClick={handleCreatePost}>
								Add new Post
							</Button>
						</Form.Group>
					</Form>
				</Col>

				<Col md={6}>
					<h3 className="text-center">Preview</h3>
					<br />

					<Card>
						<Card.Body>
							<h1 className="text-center">{title}</h1>
							<p className="text-center text-muted">{description}</p>
							<Markdown escapeHtml={true} source={content} />
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</MainContainer>
	);
};

export default add;
