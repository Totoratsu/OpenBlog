import { gql } from 'graphql-request';
import React from 'react';
import { Col, ListGroup, Row } from 'react-bootstrap';
import Footer from '../components/Footer';

import MainContainer from '../components/MainContainer';
import SearchBar from '../components/SearchBar';
import { sendQuery } from '../libs/graphql';
import PostCard from '../components/PostCard';
import { Post } from '../types';

interface IProps {
	tags: string[];
	posts: Post[];
}

const posts = ({ tags, posts }: IProps): JSX.Element => {
	return (
		<MainContainer>
			<SearchBar className="mb-4 pb-4 mt-4 pt-4" />
			<hr />
			<Row className="mb-4 pb-4 mt-4 pt-4">
				<Col md={2}>
					<aside>
						<h4 className="text-center">Tags</h4>
						<ListGroup variant="flush">
							{tags.map((tag, i) => (
								<ListGroup.Item key={i}>{tag}</ListGroup.Item>
							))}
						</ListGroup>
					</aside>
				</Col>

				<Col>
					<Row>
						{posts.map((post, i) => (
							<Col md={4} className="mt-4 mb-4" key={i}>
								<PostCard item={post} />
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
			Tags
			Posts(limit: 0) {
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
			tags: res.Tags,
			posts: res.Posts,
		},
	};
}

export default posts;
