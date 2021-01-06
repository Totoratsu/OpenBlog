import React from 'react'
import { Col, Container, ListGroup, Row } from 'react-bootstrap'

const Footer = () => {
    return (
        <footer>
            <Container>
                <p>Totoratsu 2021</p>
                <Row>
                    <Col md={6}>
                        <ListGroup variant="flush">
                            <ListGroup.Item>Github</ListGroup.Item>
                            <ListGroup.Item>LinkedIn</ListGroup.Item>
                            <ListGroup.Item>Youtube</ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer
