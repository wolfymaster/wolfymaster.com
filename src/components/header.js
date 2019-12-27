import {Col, Container, Row} from "react-bootstrap";
import React from "react";

import Menu from './menu';

const Header = (props) => {
    let { videoURL } = props;

    return <header>
        <div className="topMenu">
            <Container>
                <Row>
                    <Menu/>
                </Row>
            </Container>
        </div>
        <Container fluid={true}>
            <Row className="tagline_container">
                <Col>
                    <div className="tagline">CREATE . EDUCATE . INNOVATE</div>
                </Col>
            </Row>
            <Row>
                <Col lg={{span: 6, offset: 3}}>
                    <div className="motto">#code #programming #learning</div>
                </Col>
            </Row>
            <Row>
                <Col sm={{span: 6, offset: 3}}>
                    <div className="video">
                        <iframe width="100%" height="100%" src={videoURL+"?rel=0"} frameBorder="0"
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen />
                    </div>
                </Col>
            </Row>
        </Container>
    </header>
};

export default Header;