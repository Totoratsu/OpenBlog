import React from 'react';
import Head from 'next/head';
import { Container } from 'react-bootstrap';

import Header from './Header';

interface props {
	children: JSX.Element[] | JSX.Element;
	title?: string;
}

const MainContainer = ({ title, children }: props): JSX.Element => {
	return (
		<Container>
			<Head>
				<title>{title ? title : "Toto's DevBlog"}</title>
			</Head>
			<Header />

			{children}
		</Container>
	);
};

export default MainContainer;
