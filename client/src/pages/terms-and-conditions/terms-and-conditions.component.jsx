import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';

import './terms-and-conditions.styles.scss';

const TermsAndConditionsPageComponent = () => {
    return (
       <Container>
            <Row md = {8} xs = {8}>
                <h2 style={{
                    textAlign: 'center', 
                    paddingTop: '30px',
                    paddingBottom: '30px'
                }}> Terms & Condition</h2>
            </Row>
            <Row md = {8} xs = {8} className="terms-container">
                <p>
                    This Site belongs to <Link to='/'>Webinar Dock</ Link>. Please read this Agreement carefully before using this Site, by using this Site in any way you are actively agreeing to the terms and conditions set in the agreement.
                </p>

                <h4>
                    Permissible Use:
                </h4> 
                
                <p>
                    The content on this website is subject to the following conditions unless otherwise stated by the section concerned:
                </p>
                <ul>
                    <li>
                        The material on this side can only be used for personal, informational, or internal business purposes.
                    </li>
                    <li>
                        The material is not provided, sold, licensed or leased for any fee or other consideration.
                    </li>
                    <li>
                        Copyright, trademark and design rights apply to all sections of the site.
                    </li>
                    <li>
                        The graphics on the site can not be used without its relevant text.
                    </li>
                    <li>
                        Backlinks to the home page of the Site from any Pre-Approved Site (as defined below) are allowed, but under the following conditions:
                        <ul>
                            <li>
                                You do not frame the Site or any portions of it.
                            </li>
                            <li>
                                The backlink should not lead the public into believing that <Link to='/'>Webinar Dock</Link> endorses you or your website.
                            </li>
                            <li>
                                The backlink to the Site should not be used in anyway that miss-presents, tarnishes or disparages <Link to='/'>Webinar Dock</Link> in anyway.
                            </li>
                            <li>
                                The backlink to the Site should not be used or displayed on any web page that has malicious content or activity.
                            </li>
                            <li>
                                We may terminate your right to link or hyperlink to the Site at any time for any or no reason.
                            </li>
                        </ul>
                    </li>
                </ul>
                
                <h4>
                    User Conduct on the Site issues relating:
                </h4>
                
                <p>
                    In using the Site, including all Content and services available through it, you agree that you shall not:
                </p>
                
                <ul>
                    <li>
                        Alter or attempt to alter any content on the site, this includes deleting, replacing and modifying.
                    </li>
                    <li>
                        Interfere with the normal routines of the site with either software or back channels of any kind. Deliberate interferences with the sites networks and connections will not be tolerated on any level.
                    </li>
                    <li>
                        Compile and offload information contained on the Site. Use of robots and spiders to do so will immediately be noticed and the appropriate action be taken.
                    </li>
                    <li>
                        Use of service marks or trademarks without our prior written consent is totally prohibited; this includes Meta tags, search engine keywords, and or hidden content.
                    </li>
                </ul>
                
                <h4>
                    Modifications to the Terms and Conditions of Use:
                </h4>
                
                <p>
                    <Link to='/'>Webinar Dock</Link> reserves the right to change these terms and conditions any time with or without notice. It is your responsibility to review from time to time and go through the changes and updates so you can adhere to them. Your use of the Site following the updated changes automatically means you agree and accept the modified terms and conditions of use. If you have issues with the conditions set forth, you should stop using the site immediately.
                </p>
                
                <h4>
                    Termination of Site and or Modifications to Site:
                </h4>
                
                <p>
                    <Link to='/'>Webinar Dock</Link> reserves the right to modify or terminate your access to the Site at any time with or without notice. This termination or restriction can either be temporary or permanent. We may also impose limitations on certain features and services or charge fees for access to these features and services without notice or liability.
                </p>
                
                <p>
                    By using the Site, you acknowledge and agree that <Link to='/'>Webinar Dock</Link> will not be responsible in anyway to you and any other third party involved in the event that your access to the Site is terminated.
                </p>

                <h4>
                    Your Privacy:
                </h4>
                
                <p>
                
                    Information collected on this Site will be used and treated in accordance with the website’s Privacy Policy. It is your responsibility to read and review the Privacy Policy before you use this Site; the Private Policy is linked on this statement for easier access. If you do not agree with the Private Policy of this Site, we ask that you stop using the Site immediately. Any continued use of the Site means that you agree to the stipulated terms and will be treated as such.
                </p>
            </Row>
       </Container>
    )
}

export default TermsAndConditionsPageComponent;