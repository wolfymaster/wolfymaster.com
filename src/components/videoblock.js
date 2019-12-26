import {Col, Row} from "react-bootstrap";
import React from "react";

const decodeEntities = (function() {
    // this prevents any overhead from creating the object each time
    const element = typeof document !== `undefined` ? document.createElement('div') : null;

    return (str) => {
        if(str && typeof str === 'string') {
            // strip script/html tags
            str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
            str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
            element.innerHTML = str;
            str = element.textContent;
            element.textContent = '';
        }
        return str;
    };
})();

const VideoBlock = (props) => {
    let {vids} = props;
    return <Col sm={12} md={4}>
        <Row>
            <Col sm={12}>
                <div className="mainVideo" style={ {background: `url('${vids[0].snippet.thumbnails.medium.url}') 100%/100% no-repeat` } } >
                    <div className="mainVideo_wrapper">
                        <div className="mainVideo_title"><a href={`http://www.youtube.com/watch?v=${vids[0].id.videoId}`} target="_blank">{decodeEntities(vids[0].snippet.title)}</a></div>
                        <div className="mainVideo_description">{vids[0].snippet.description.substr(0,50)}</div>
                    </div>
                    <div className="overlay" style={ { "--hue": 380 } } />
                    <a className="link-overlay" href={`http://www.youtube.com/watch?v=${vids[0].id.videoId}`} target="_blank" />
                </div>
            </Col>
        </Row>
        <Row className="subVideo">
            <Col sm={12} md={6}>
                <div className="video">
                    <div className="subVideo_bg" style={ {background: `url('${vids[1].snippet.thumbnails.medium.url}') 100%/100% no-repeat` } }>
                        <a className="link-overlay" href={`http://www.youtube.com/watch?v=${vids[1].id.videoId}`} target="_blank" />
                    </div>
                    <div className="subVideo_title">
                        <a href={`http://www.youtube.com/watch?v=${vids[1].id.videoId}`} target="_blank">{decodeEntities(vids[1].snippet.title)}</a>
                        <div className="subVideo_description">{vids[1].snippet.description}</div>
                    </div>
                </div>
            </Col>
            <Col sm={12} md={6}>
                <div className="video">
                    <div className="subVideo_bg" style={ {background: `url('${vids[2].snippet.thumbnails.medium.url}') 100%/100% no-repeat` } }>
                        <a className="link-overlay" href={`http://www.youtube.com/watch?v=${vids[2].id.videoId}`} target="_blank" />
                    </div>
                    <div className="subVideo_title">
                        <a href={`http://www.youtube.com/watch?v=${vids[2].id.videoId}`} target="_blank">{decodeEntities(vids[2].snippet.title)}</a>
                        <div className="subVideo_description">{vids[2].snippet.description}</div>
                    </div>
                </div>
            </Col>
        </Row>
    </Col>
};

export default VideoBlock;