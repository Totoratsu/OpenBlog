import { gql } from 'graphql-request';
import React from 'react';
import Markdown from 'react-markdown';

import Footer from '../../components/Footer';
import MainContainer from '../../components/MainContainer';
import { sendQuery } from '../../libs/graphql';
import { IPost } from '../../types';

const PostPage = ({ post }: { post: IPost }): JSX.Element => {
    return (
        <MainContainer>
            <h1 className="text-center">{post.title}</h1>
            <p>{post.description}</p>
            <Markdown escapeHtml={true} source={post.content} />
            <hr />
            <Footer />
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

    console.log(res)

    return {
        post: res.Post,
    };
};

export default PostPage;
