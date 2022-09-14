import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Container } from 'react-bootstrap';

import './footer.styles.scss';

const Footer = () => {
    const year = new Date().getFullYear();
    
    return (
        <>  
            <div className="terms-and-conditions">
                <Container>
                    <Row>
                        <Col xs={6} sm={3} md={3}>
                            <h4 style={{color: '#1aa5d8', paddingTop: '20px'}}>Get To Know Us</h4>
                            <Row>
                                <span>
                                    <Link to='/privacy-policy'>
                                        Privacy Policy
                                    </Link>
                                </span>
                                <span>
                                    <Link to = '/terms'>
                                        Terms & Condition
                                    </Link>
                                </span>
                                <span>
                                    <Link to = '/refund-cancellation'>
                                        Refund & Cancellation
                                    </Link>
                                </span>
                            </Row>
                        </Col>
                        <Col xs={6} sm={3} md={3}>
                            <h4 style={{color: '#1aa5d8', paddingTop: '20px'}}>About Us</h4>
                            <Row>
                                <span>
                                    <Link to = '/speakers'>
                                        Speaker
                                    </Link>
                                </span>
                                <span>
                                    <Link to = '/faq'>
                                        Faq
                                    </Link>
                                </span>
                                <span>
                                    <Link to='/unsubscribe'>
                                        Unsubscribe
                                    </Link>
                                </span>
                            </Row>
                        </Col>
                        <Col xs={6} sm={3} md={3}>
                            <h4 style={{color: '#1aa5d8', paddingTop: '20px'}}>Let Us Help You</h4>
                            <Row>
                                <span>
                                    <Link to='/speaker-opportunity'>
                                        Speaker Opportunity
                                    </Link>
                                </span>
                                <span>
                                    <Link to='/topic-suggestion'>
                                        Suggest A Topic
                                    </Link>
                                </span>
                                <span>
                                    <Link to='/subscribe'>
                                        Subscribe Now
                                    </Link>
                                </span>
                            </Row>
                        </Col>
                        <Col xs={6} sm={3} md={3}>
                            <h4 style={{color: '#1aa5d8', paddingTop: '20px'}}>Follow Us</h4>
                            <Row className="social-media-links" style={{margin: '0'}}>
                                <a href="#" className="twitter">
                                    <i className="fa fa-twitter-square"></i>
                                </a>
                                <a href="#" className="facebook">
                                    <i className="fa fa-facebook-squarefa fa-facebook-square"></i>
                                </a>
                                <a href="#" className="linkedin">
                                    <i className="fa fa-linkedin-square"></i>
                                </a>
                                <a href="#" className="instagram">
                                    <i className="fa fa-instagram"></i>
                                </a>
                                <a href="#" className="youtube">
                                    <i className="fa fa-youtube-square"></i>
                                </a>
                                <a href="#" className="pinterest">
                                    <i className="fa fa-pinterest-square"></i>
                                </a>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <span style = {{color: 'rgb(26, 165, 216)'}}>For Customer Support: &nbsp;  &nbsp;
                            <i className="fa fa-envelope" aria-hidden="true"></i>  &nbsp;
                            <a href = "mailto:cs@webinardock.com">
                                cs@webinardock.com
                            </a> 
                        </span>
                    </Row>
                </Container>
            </div>
            <div className='footer'>
                <span> &copy; {year} Copyright
                    <Link to="/" className= "footer-link" style={{textIndent: '5px'}}>
                        <strong>Webinar Dock</strong>
                    </Link>. All Rights Reserved 
                </span>
            </div>
        </>
    )
};

export default Footer;