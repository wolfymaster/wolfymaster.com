import React, {useEffect, useState} from "react";
import GhostContentAPI from "@tryghost/content-api";
import {Col, Container, Row} from "react-bootstrap";

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

export default BlogEntries;