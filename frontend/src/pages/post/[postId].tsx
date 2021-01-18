import { gql } from 'graphql-request';
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Markdown from 'react-markdown';

import MainContainer from '../../components/MainContainer';
import { sendQuery } from '../../libs/graphql';
import { IPost } from '../../types';

const PostPage = ({ post }: { post: IPost }): JSX.Element => {
	return (
		<MainContainer>
			<h1 className="text-center">{post.title}</h1>
			<Row className="justify-content-center">
				<Col md={6}>
					<p className="text-center text-muted">{post.description}</p>
				</Col>
			</Row>
			<Row className="justify-content-center">
				<Col md={9}>
					<Markdown escapeHtml={true} source={post.content} />
				</Col>
			</Row>

			<br />
			<p className="text-muted">Author: {post.author.username}</p>
		</MainContainer>
	);
};

PostPage.getInitialProps = async ({
	query: { postId },
}): Promise<{ post: IPost }> => {
	const res = await sendQuery(gql`
    	{
    		Post(id: ${postId}) {
    			title
    			description
                content
    			author {
    				username
    			}
    		}
    	}
    `);

	return {
		post: res.Post,
	};
};

export default PostPage;
