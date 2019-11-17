import {Col, Container, Row} from "react-bootstrap";
import React from "react";
import { SocialIcon } from 'react-social-icons';

const Footer = () => {
    return <Container id="footer">
        <Row>
            <Col>
                <div className="social d-flex align-content-center justify-content-center">
                    <div><SocialIcon url="https://linkedin.com/in/wolfymaster" target="_blank" /></div>
                    <div><SocialIcon url="https://github.com/wolfymaster" target="_blank" /></div>
                    <div><SocialIcon url="https://twitter.com/wolfymaster" target="_blank" /></div>
                    <div><SocialIcon url="https://youtube.com/wolfymaster" target="_blank" /></div>
                </div>
            </Col>
        </Row>
        <Row>
            <Col>
                <div>Educating and making programming fun on our forever learning adventure.</div>
                <div>Covering all topics of programming & technology. Let's build a community of talent.</div>
            </Col>
        </Row>
    </Container>
};

export default Footer;
