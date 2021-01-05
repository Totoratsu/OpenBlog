import React from 'react';
import Head from 'next/head';
import { Container as _Container } from 'react-bootstrap';

import Header from './Header';

interface props {
    children: any;
    title?: string;
}

const Container = ({ title, children }: props) => {
    return (
        <_Container>
            <Head>
                <title>{title ? title : 'Toto\s DevBlog'}</title>
            </Head>
            <Header />

            {children}
        </_Container>
    )
}

export default Container
