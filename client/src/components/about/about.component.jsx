import React from "react";
import {Link} from 'react-router-dom';
import {Container, Row} from 'react-bootstrap';

import './about.styles.scss';

const AboutComponent = () => {
    
    return(
        <Container>
            <Row md = {8} xs = {8}>
                <h2 style={{
                    textAlign: 'center', 
                    paddingTop: '30px',
                    paddingBottom: '30px'
                }}> About Us</h2>
            </Row>
            <Row md = {8} xs = {8} className="about-us-container">
            <p><Link to ='/'>Webinar Dock</Link> is a digital space that provides attendees from healthcare backgrounds an opportunity to broaden their horizons and furnish their skills to up their professional game. Our program is molded to help you reach and exceed your personal goals across all specialties. We also offer customized e-learning for people willing to expand their business software, technology, and creative skills. We ensure that you experience the best in terms of webinars and technology.</p>
            <p>Choose from any mode of learning- live webinars, recorded- audio-visuals, transcripts, DVDs, or handouts suiting your professional needs and interact with speakers and give rest to your wandering mind with doubts and confusion. Also, you can choose from the webinar packs for a better comprehension of trending webinars and stay compliant to CMS, HIPAA, and more.</p>
            <p>We provide you with the best panel of experts who are phenomenal in their own fields. They have several years of experience and have worked closely at different levels especially when it comes to compliance. Also, never miss an important update when registering with us, since we keep you abreast of all the current happenings, and the present modifications done in your own field of expertise.</p>
            <p>Our goal is to equip you with the exquisite skills needed to advance your position. We believe you will enjoy your experience with the Conference Panel. The time for you to upgrade your skills is now, get in touch with our friendly help desk and they will guide you through the crucial topics, speakers and other important things to get started.</p>
            </Row>
       </Container>
    )
}

export default AboutComponent;