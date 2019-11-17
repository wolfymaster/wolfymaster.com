import {Button, Col, Container, Row} from "react-bootstrap";
import React from "react";

import Menu from './menu';

const Header = (props) => {
    let { videoURL } = props;

    return <header style={{background: "linear-gradient(165deg, #ed6a5a 60%, #454851 40%)"}}>
        <Container fluid={true}>
            <Row style={{background: "#a74c43"}}>
                <Col lg={{span: 4, offset: 8}}>
                    <Menu/>
                </Col>
            </Row>
            <Row style={ { marginTop: "200px"} }>
                <Col sm={{span: 6, offset: 3}}>
                    <div style={{fontSize: "48px", textAlign: "center"}}>CREATE . EDUCATE . INNOVATE</div>
                </Col>
            </Row>
            <Row>
                <Col sm={{span: 6, offset: 3}}>
                    <div style={{fontSize: "32px", textAlign: "center"}}>drinkin’ rum and cola underneath the rising
                        sun
                    </div>
                </Col>
            </Row>
            <Row  style={ { margin: "50px 0"} }>
                <Col sm={{span: 2, offset: 4}}>
                    <Button size="lg" block>Something</Button>
                </Col>
                <Col sm={{span: 2}}>
                    <Button variant="outline-dark" size="lg" block>Something</Button>
                </Col>
            </Row>
            <Row style={ { marginTop: "50px", paddingBottom: "50px"} }>
                <Col sm={{span: 6, offset: 3}}>
                    <iframe width="100%" height="490" src={videoURL+"?rel=0"} frameBorder="0"
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen />
                </Col>
            </Row>
        </Container>
    </header>
};

export default Header;