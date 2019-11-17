import React, { useState, useEffect } from 'react';
import {Row, Col, Container, Navbar, Nav, Button, Carousel} from 'react-bootstrap';
import AliceCarousel from 'react-alice-carousel';
import Header from '../components/header';
import Contact from '../components/contact';
import Footer from '../components/footer';
import GhostContentAPI from '@tryghost/content-api'

import '../scss/index.scss';
import "react-alice-carousel/lib/alice-carousel.css";

const Highlight = () => {
    return <Container style={ {color: "#ed6a5a", fontSize: "24px"} }>
        <Row>
            <Col sm="6">
                <img src="https://www.rspcasa.org.au/wp-content/uploads/2019/01/Adopt-cat-mobile-banner-600x300-fit-constrain-q70-mobile_banner_image.jpg" height="200px" />
            </Col>
            <Col sm="6">
                <div style={ { fontSize: "32px" } }><strong>MentorErie Mentorship Framework</strong></div>
                <div>
                    Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem.
                </div>
            </Col>
        </Row>
        <Row style={ { marginTop: "50px"} }>
            <Col sm="6">
                <div style={ { fontSize: "32px" } }><strong>NWPA Tech</strong></div>
                <div>
                    Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem.
                </div>
            </Col>
            <Col sm="6">
                <img src="https://www.rspcasa.org.au/wp-content/uploads/2019/01/Adopt-cat-mobile-banner-600x300-fit-constrain-q70-mobile_banner_image.jpg" />
            </Col>
        </Row>
    </Container>
};

const BlogEntries = () => {
    const [articles, setArticles] = useState([]);
    const api = new GhostContentAPI({
        url: 'http://wolfymaster.design:2368',
        key: '3916dd1fc8ec42fa75b51e3505',
        version: 'v2',
    });

    useEffect( () => {
        api.posts.browse({
            limit: 3,
        }).then( posts => {
            console.log(posts);
            setArticles(posts);
        }).catch( err => {
            console.error(err);
        });
    }, []);

    return <Container fluid={true}>
        <Row>
            {articles.map( (a, k) =>
                <Col className="p-0 d-flex align-content-center flex-wrap justify-content-center entry" sm="4" style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("${a.feature_image}")` }} key={k}>
                    <div style={ {textAlign:"center", fontSize: "32px"} }>
                        <a href={a.url} target="_blank">{a.title}</a>
                    </div>
                </Col>
            )}
        </Row>
    </Container>
};

const TechUncensored = () => {
    const apiURL = "https://www.googleapis.com/youtube/v3/search?key=AIzaSyCfCfHSZZBdy3Ud-mRJ30fzBbKsOIMV0jM&channelId=UC44jpOmnvm-iTfkq-4Jj4CA&part=snippet,id&order=date&maxResults=20"
    const [vids, setVids] = useState([]);

    useEffect( () => {
        fetch(apiURL)
            .then(res => res.json())
            .then( vids => {
                vids.items && setVids(vids.items.filter( i => i.id.kind === "youtube#video"));
            });
    }, []);

    return <>
        <Container>
            <Row>
                <Col className="" md="6" lg="2">

                </Col>
                <Col className="" md="6" lg={{span: 6, offset: 6}}>
                    <h3>Join the Tech Uncensored Community</h3>
                    <Row>
                        <Col sm="6">
                            <Button size="lg" block>Something</Button>
                        </Col>
                        <Col sm="6">
                            <Button variant="outline-dark" size="lg" block>Something</Button>
                        </Col>
                    </Row>
                    <Row id="spotify">
                        <Col>
                            <iframe title="Spotify" src="https://open.spotify.com/embed/show/3yMZnF0xnB1r07PT7V8Dpl" width="100%" height="300" frameBorder="0" scrolling="yes" allow="encrypted-media" />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
        <Container fluid="true">
            <Row id="techUncensored-videos">
                <Col sm="12">
                    <AliceCarousel dotsDisabled={true} responsive={ { 0: { items: 4 }} } infinite={false}>
                        { vids.map((v, k) => <a key={k} href={`http://www.youtube.com/watch?v=${v.id.videoId}`} target="_blank"><img src={v.snippet.thumbnails.medium.url} key={k} /></a> ) }
                    </AliceCarousel>
                </Col>
            </Row>
        </Container>
    </>
};

const homepage = () => {
    return <>
        <Header videoURL="https://www.youtube.com/embed/pgwxSwitnd8" />
        <section style={{background: "#eaebf0", padding:"100px 0"}}>
            <Highlight/>
        </section>
        <section id="blogEntries">
            <BlogEntries/>
        </section>
        <section id="techUncensored">
            <TechUncensored/>
        </section>
        <section id="contact">
            <Contact />
        </section>
        <section id="footer">
            <Footer />
        </section>
    </>
};

export default homepage