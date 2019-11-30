import React from "react"
import {Col, Row, Container} from "react-bootstrap";
import Menu from "../components/menu";
import Contact from '../components/contact';
import Footer from '../components/footer';

import '../scss/subpage.scss';


const subpageTemplate = ({children, pageContext:{frontmatter}}) => {

    let menuBackground = frontmatter.menuBackground || "rgba(167,76,67,0.5)";

    console.log(frontmatter, frontmatter.hasBanner === true);

    return (
        <>
            <Container fluid={true}>
                <Row style={frontmatter.hasBanner === true ? {background: menuBackground } : {background: "#a74c43"}}>
                    <Col lg={{span: 4, offset: 8}}>
                        <Menu/>
                    </Col>
                </Row>
            </Container>

            <Container fluid={frontmatter.hasBanner === true} style={frontmatter.hasBanner === true ? {marginTop:"-56px"} : {}}>
                <Row>
                    <div style={ frontmatter.hasBanner === true ? {width:"100%", marginBottom: "50px"} : {margin: "50px auto"}}>
                        {children}
                    </div>
                </Row>
            </Container>

            <section id="contact" className="subpage">
                <Contact />
            </section>
            <section id="footer" className="subpage">
                <Footer />
            </section>
        </>
    )
};

export default subpageTemplate;