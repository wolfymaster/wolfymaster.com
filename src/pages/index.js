import React from 'react';
import Header from '../components/header';
import BlogEntries from '../components/blogentries';
import Highlight from '../components/highlight';
import TechUncensored from '../components/techuncensored';
import Contact from '../components/contact';
import Footer from '../components/footer';

import '../scss/index.scss';
// import "react-alice-carousel/lib/alice-carousel.css";

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