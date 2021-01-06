import React, { useState, useEffect } from 'react';
import gql from 'graphql-tag';

import { Post } from '../types';
import MainContainer from '../components/MainContainer';
import SearchBar from '../components/SearchBar';
import { sendQuery } from '../libs/graphql';
import PostBox from '../components/PostCard';
import { Col, Row, Container } from 'react-bootstrap';
import Footer from '../components/Footer';

const index = ({ posts }: { posts: Post[] }) => {

    return (
        <MainContainer>
            <main>
                <Container className="mb-4 mt-4 p-4">
                    <h1>Hello World!</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                </Container>
            </main>

            <Row className="justify-content-md-center">
                <Col md={8}>
                    <SearchBar className="mt-3 mb-4 p-2" />
                </Col>
            </Row>
            <hr />
            <Row>{
                posts.map((post, i) => (
                    <Col md={4} className="mt-4 mb-4">
                        <PostBox item={post} key={i} />
                    </Col>
                ))
            }</Row>
            <hr />
            <Footer />
        </MainContainer>
    )
}

export async function getStaticProps() {
    const posts = await sendQuery(gql`
        {
            Posts(limit:3) {
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
