import React, { useState, useEffect } from 'react';
import {Row, Col, Container, Button} from 'react-bootstrap';
import AliceCarousel from 'react-alice-carousel';
import Header from '../components/header';
import Contact from '../components/contact';
import Footer from '../components/footer';
import GhostContentAPI from '@tryghost/content-api'

import '../scss/index.scss';
import "react-alice-carousel/lib/alice-carousel.css";
import {Link} from "gatsby";

const Highlight = () => {
    return <Container style={ {color: "#ed6a5a", fontSize: "24px"} } fluid={true}>

        <Row style={ { background: "url('https://www.solidbackgrounds.com/images/website/950x534/950x534-blue-stained-glass-free-website-background-image.jpg') 100%/100% no-repeat"} }>
            <Col>
                <div style={ { width: "100%", height: "400px", position: "relative", display: "flex",  }}>
                    <div className="diag" style={ {width: "70%", height:"100%", right:0, alignSelf: "center", display: "flex", alignItems: "center", justifyContent: "center", position: "absolute", marginRight:"-15px", flexDirection: "column" } }>
                        <div style={ { fontSize: "48px" } }>
                            <Link to="/mentorerie">
                                <span style={{ color:"#FFF" }}><strong>Mentorship Framework</strong></span>
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
                <div style={ { width: "100%", height: "400px", position: "relative", display: "flex",  }}>
                    <div className="rev-diag" style={ {width: "70%", height:"100%", alignSelf: "center", display: "flex", alignItems: "center", justifyContent: "center", paddingLeft: "100px", marginLeft: "-15px", flexDirection: "column" } }>
                        <div style={ { fontSize: "48px" } }>
                            <Link to="/nwpatech">
                                <span style={{ color:"#FFF" }}><strong>NWPA Tech</strong></span>
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

const BlogEntries = () => {
    const [articles, setArticles] = useState([]);
    const api = new GhostContentAPI({
        url: process.env.GATSBY_BLOG_URL,
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
    const apiURL = `https://www.googleapis.com/youtube/v3/search?key=${process.env.GATSBY_YOUTUBE_KEY}&channelId=UC44jpOmnvm-iTfkq-4Jj4CA&part=snippet,id&order=date&maxResults=20`
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
                <Col className="" md="12" lg="12">
                    <Row id="spotify" style={ { alignContent: "center" } }>
                        <Col>
                            <h3>Join the Tech Uncensored Community</h3>
                        </Col>
                        <Col>
                            <div style={ { display: "flex", width: "100%", height: "300px" } }>
                                <iframe title="Spotify" src="https://open.spotify.com/embed/show/3yMZnF0xnB1r07PT7V8Dpl" width="100%" height="300" frameBorder="0" scrolling="yes" allow="encrypted-media" style={ { height: "235px", alignSelf: "center" } } />
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>

        <section style={ { display: "flex", flexDirection: "row", justifyContent: "space-around", padding: "0 50px" } }>
            { vids.length && <VideoBlock vids={vids.slice(0,3)} /> }
            { vids.length && <VideoBlock vids={vids.slice(3,6)} /> }
            { vids.length && <VideoBlock vids={vids.slice(6,9)} /> }
        </section>
    </>
};

const VideoBlock = (props) => {
    let {vids} = props;
    return <div className="videoBlock" style={ { width: "33%" } }>
        <div style={ {background: `url('${vids[0].snippet.thumbnails.medium.url}') 100%/100% no-repeat`, width: "100%", height: "306px", position: "relative"} } >
            <div style={ { position:"absolute", bottom: "25px", left: "10px", zIndex: 1 } }>
                <div style={ { color: "#FFF", fontSize: "32px" } }><a style={ { color: "#FFF" } } href={`http://www.youtube.com/watch?v=${vids[0].id.videoId}`} target="_blank">{vids[0].snippet.title}</a></div>
                <div style={ { color: "#FFF", fontSize: "18px" } }>{vids[0].snippet.description.substr(0,50)}</div>
            </div>
            <div className="overlay" style={ { "--hue": 380 } } />
            <a className="link-overlay" href={`http://www.youtube.com/watch?v=${vids[0].id.videoId}`} target="_blank" />
        </div>
        <div style={ { display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: "5px" } }>
            <div className="hscale" style={ { flexGrow: 1, width: "50%" }}>
                <div style={ {background: `url('${vids[1].snippet.thumbnails.medium.url}') 100%/100% no-repeat`, width: "99%", height: "150px", position: "relative"} }>
                    <a className="link-overlay" href={`http://www.youtube.com/watch?v=${vids[1].id.videoId}`} target="_blank" />
                </div>
                <div className="title" style={ { fontSize: "14px", fontWeight: "bold" } }>
                    <a href={`http://www.youtube.com/watch?v=${vids[1].id.videoId}`} target="_blank">{vids[1].snippet.title}</a>
                    <div className="description">{vids[1].snippet.description}</div>
                </div>
            </div>
            <div className="hscale" style={ { flexGrow: 1, width: "50%" }}>
                <div style={ {background: `url('${vids[2].snippet.thumbnails.medium.url}') 100%/100% no-repeat`, width: "99%", height: "150px", position: "relative"} }>
                    <a className="link-overlay" href={`http://www.youtube.com/watch?v=${vids[1].id.videoId}`} target="_blank" />
                </div>
                <div className="title" style={ { fontSize: "14px", fontWeight: "bold" } }>
                    <a href={`http://www.youtube.com/watch?v=${vids[2].id.videoId}`} target="_blank">{vids[2].snippet.title}</a>
                    <div className="description">{vids[2].snippet.description}</div>
                </div>
            </div>
        </div>
    </div>
}

const homepage = () => {
    return <>
        <Header videoURL="https://www.youtube.com/embed/pgwxSwitnd8" />
        <section id="blogEntries">
            <BlogEntries/>
        </section>
        <section style={{background: "#eaebf0", padding:"0 0 0 0"}}>
            <Highlight/>
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