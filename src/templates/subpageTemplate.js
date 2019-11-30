import React from "react"
import {Col, Row, Container} from "react-bootstrap";
import Menu from "../components/menu";
import Contact from '../components/contact';
import Footer from '../components/footer';


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

            <Container fluid={frontmatter.hasBanner === true} style={frontmatter.hasBanner === true ? {marginTop:"-56px", zIndex:-1, position:"relative"} : {}}>
                <Row>
                    <div style={ frontmatter.hasBanner === true ? {width:"100%"} : {margin: "50px auto"}}>
                        {children}
                    </div>
                </Row>
            </Container>

            <section id="contact">
                <Contact />
            </section>
            <section id="footer">
                <Footer />
            </section>
        </>
    )
};

export default subpageTemplate;