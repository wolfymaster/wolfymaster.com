import React, {useEffect, useState} from "react";
import {Col, Container, Row} from "react-bootstrap";
import VideoBlock from './videoblock';

const TechUncensored = () => {
    const apiURL = `https://www.googleapis.com/youtube/v3/search?key=${process.env.GATSBY_YOUTUBE_KEY}&channelId=UC44jpOmnvm-iTfkq-4Jj4CA&part=snippet,id&order=date&maxResults=20`;
    const [vids, setVids] = useState([]);

    useEffect( () => {
        fetch(apiURL)
            .then(res => res.json())
            .then( vids => {
                if(vids.error) {
                    // YT API failed to fetch videos
                    console.error(vids.error);
                    console.error(vids.error.message);
                }
                vids.items && setVids(vids.items.filter( i => i.id.kind === "youtube#video"));
            });
    }, []);

    return <>
        <Container>
            <Row>
                <Col>
                    <Row id="spotify" style={ { alignContent: "center" } }>
                        <Col sm={12} md={6}>
                            <h3>Join the Tech Uncensored Community</h3>
                        </Col>
                        <Col sm={12} md={6}>
                            <div style={ { display: "flex", width: "100%", height: "300px" } }>
                                <iframe title="Spotify" src="https://open.spotify.com/embed/show/3yMZnF0xnB1r07PT7V8Dpl" width="100%" height="300" frameBorder="0" scrolling="yes" allow="encrypted-media" style={ { height: "235px", alignSelf: "center" } } />
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>

        <Container className="videoBlocks" fluid={true}>
            <Row>
                { vids.length > 0 && <VideoBlock vids={vids.slice(0,3)} /> }
                { vids.length > 0 && <VideoBlock vids={vids.slice(3,6)} /> }
                { vids.length > 0 && <VideoBlock vids={vids.slice(6,9)} /> }
            </Row>
        </Container>
    </>
};

export default TechUncensored;