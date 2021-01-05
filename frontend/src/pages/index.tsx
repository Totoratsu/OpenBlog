import React, { useState, useEffect } from 'react';
import gql from 'graphql-tag';

import { Post } from '../types';
import Container from '../components/Container';
import SearchBar from '../components/SearchBar';
import { sendQuery } from '../libs/graphql';
import PostBox from '../components/PostCard';

const index = ({ posts }: { posts: Post[] }) => {

    return (
        <Container>
            <SearchBar className="mt-4" />
            {
                posts.map((post, i) => (
                    <PostBox item={post} key={i} />
                ))
            }
        </Container>
    )
}

export async function getStaticProps() {
    const posts = await sendQuery(gql`
        {
            Posts {
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
