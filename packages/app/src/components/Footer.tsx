import Link from 'next/link';
import React from 'react';
import { Col, Container, ListGroup, Row } from 'react-bootstrap';

const Footer = ({ className }: { className?: string }): JSX.Element => {
	return (
		<footer className={className}>
			<Container>
				<p>Totoratsu 2021</p>
				<Row>
					<Col md={6}>
						<ListGroup variant="flush">
							<ListGroup.Item>
								<Link href="https://github.com/Totoratsu">
									<a target="blank">Github</a>
								</Link>
							</ListGroup.Item>

							<ListGroup.Item>
								<Link href="https://www.linkedin.com/">
									<a target="blank">LinkedIn</a>
								</Link>
							</ListGroup.Item>

							<ListGroup.Item>
								<Link href="https://www.youtube.com/">
									<a target="blank">Youtube</a>
								</Link>
							</ListGroup.Item>
						</ListGroup>
					</Col>
				</Row>
			</Container>
		</footer>
	);
};

export default Footer;
