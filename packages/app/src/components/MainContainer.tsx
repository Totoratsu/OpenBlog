import React from 'react';
import Head from 'next/head';
import { Container } from 'react-bootstrap';

import Header from './Header';
import Footer from './Footer';

interface props {
	children: JSX.Element[] | JSX.Element;
	title?: string;
	className?: string;
}

const MainContainer = ({ title, children, className }: props): JSX.Element => {
	return (
		<Container className={className}>
			<Head>
				<title>{title ? title : "Toto's DevBlog"}</title>
			</Head>

			<div id="body">
				<Header />

				{children}
			</div>

			<hr className="mt-4 pt-4" />
			<Footer />
		</Container>
	);
};

export default MainContainer;
