import React from 'react';
import { gql } from 'graphql-request';
import Link from 'next/link';

import { IPost } from '../types';
import MainContainer from '../components/MainContainer';
import { sendQuery } from '../libs/graphql';
import PostCard from '../components/PostCard';
import { Col, Row, Container } from 'react-bootstrap';

const index = ({ posts }: { posts: IPost[] }): JSX.Element => {
	return (
		<MainContainer>
			<main>
				<Container className="mb-4 mt-4 p-4">
					<h1>Hello World!</h1>
					<p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
				</Container>
			</main>

			<hr />
			<Row>
				{posts.map((post, i) => (
					<Col md={4} className="mt-4 mb-4" key={i}>
						<PostCard item={post} />
					</Col>
				))}
			</Row>

			<br />
			<Link href="/posts">
				<a>
					<p className="text-center">More posts</p>
				</a>
			</Link>
			<br />
		</MainContainer>
	);
};

export async function getStaticProps(): Promise<{ props: { posts: IPost[] } }> {
	const posts = await sendQuery(gql`
		{
			Posts(limit: 3) {
				id
				title
				description
				author {
					username
				}
			}
		}
	`);

	return {
		props: {
			posts: posts.Posts,
		},
	};
}

export default index;
