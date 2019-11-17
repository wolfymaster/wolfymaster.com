import {Col, Container, Row} from "react-bootstrap";
import React from "react";

const Contact = () => {
    return <Container>
        <Row>
            <Col className="cta">
                Let's talk<br />
                about your<br />
                project.
            </Col>
            <Col>
                <form action="">
                    <input type="text" name="name" placeholder="Your Name" />
                    <input type="text" name="email" placeholder="Email" />
                    <textarea name="message" placeholder="Message" rows="8" />
                </form>
            </Col>
        </Row>
    </Container>
};

export default Contact;
