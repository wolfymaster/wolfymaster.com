import {Col, Container, Row} from "react-bootstrap";
import {Link} from "gatsby";
import React from "react";

const Highlight = () => {
    return <Container className="highlight" fluid={true}>

        <Row style={ { background: "url('https://www.solidbackgrounds.com/images/website/950x534/950x534-blue-stained-glass-free-website-background-image.jpg') 100%/100% no-repeat"} }>
            <Col>
                <div className="highlight_container">
                    <div className="diag flex">
                        <div className="highlight_link_container">
                            <Link to="/mentorerie">
                                <span>Mentorship Framework</span>
                            </Link>
                        </div>
                        <div>
                            Professional development for your organization
                        </div>
                    </div>
                </div>
            </Col>
        </Row>

        <Row style={ {background: "url('https://cdn.wallpapersafari.com/84/60/iOwtxg.jpg') 100%/100% no-repeat" } }>
            <Col>
                <div className="highlight_container">
                    <div className="rev-diag flex">
                        <div className="highlight_link_container">
                            <Link to="/nwpatech">
                                <span>NWPA Tech</span>
                            </Link>
                        </div>
                        <div>
                            Exploring technology education
                        </div>
                    </div>
                </div>
            </Col>
        </Row>
    </Container>
};

export default Highlight;