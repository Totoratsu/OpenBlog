import { gql } from 'graphql-request';
import React, { useState } from 'react';
import { Col, ListGroup, Row } from 'react-bootstrap';

import MainContainer from '../components/MainContainer';
import SearchBar from '../components/SearchBar';
import { sendQuery } from '../libs/graphql';
import PostCard from '../components/PostCard';
import { IPost } from '../types';

interface IProps {
	tags: string[];
	posts: IPost[];
}

const posts = ({ tags, posts }: IProps): JSX.Element => {
	const [filteredList, setList] = useState(posts);
	const [term, setTerm] = useState('');

	function handleSearchBar(t: string): void {
		setTerm(t);
		if (t === '' || t === ' ') {
			setList(posts);
			return;
		}

		setList(posts.filter(({ title }) => title.includes(t)));
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
						{filteredList.map((post, i) => (
							<Col md={4} className="mt-4 mb-4" key={i}>
								<PostCard item={post} />
							</Col>
						))}
					</Row>
				</Col>
			</Row>
		</MainContainer>
	);
};

export async function getStaticProps(): Promise<{ props: IProps }> {
	const res = await sendQuery(gql`
		{
			Tags
			Posts(limit: 0) {
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
			tags: res.Tags,
			posts: res.Posts,
		},
	};
}

export default posts;
