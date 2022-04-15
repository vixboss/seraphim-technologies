import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';

import './privacy-policy.styles.scss';

const PrivacyPolicyPageComponent = () => {
    return (
       <Container>
            <Row md = {8} xs = {8}>
                <h2 style={{
                    textAlign: 'center', 
                    paddingTop: '30px',
                    paddingBottom: '30px'
                }}> Privacy Policy</h2>
            </Row>
            <Row md = {8} xs = {8} className="privacy-container">
                <p> 
                    <Link to='/'> Webinar Dock </Link> respects all its user’s privacy and has structures in place to protect the information you provide to us through this website. No information is sold, distributed or provided to third parties whatsoever. The information we gather on this site is used and distributed within the company structure alone. This is done so as we can provide you with a better service and respond to your requests. We apply the following guidelines and structures to protect your privacy:
                </p>
                <h4>
                    Collecting User data and Information:
                </h4>
                   
                <p>
                    During website use, we may collect specific data from the website visitors and store it in our Internet access logs. The information is collected indirectly by capturing the browser’s domain name and I.P address. This information is reserved for studies and surveys on our website performance in relations to sectors and visitor access.
                </p>
                
                <h4>
                    Use of Cookies:
                </h4>
                
                <p>
                
                    The <Link to='/'> Webinar Dock </Link> website may use cookies to collect small files of data and information concerning your activity on the site. These cookies enable us to produce statistical data on the site visits and activity. Please note that cookies alone can in no way be used to find out the identity of any user. The only way we can know exactly who you are is if you directly inform us by completing a contact form. You are not bound to use cookies while accessing or site, if you want you can disable cookies on your computer by changing the settings in preferences or options menu in your browser.
                </p>
                
                <h4>
                    Disclosure of User Information:
                </h4>
                
                <p>
                    Visiting and using the <Link to='/'> Webinar Dock </Link> website does not require you to tell us who you are or give us any of your identity data. However, there are times when its necessary for us to know some details concerning your identity and location so we can respond to your request and queries. In such cases we may require information from you. We do not share, sell or rent out any of the information that you provide us to other companies or third party institutions. All information that you send to us through contact forms and emails is securitized and used within the structure of this company only.
                </p>
                
                <h4>
                    We may disclose your personal information in the following circumstances:
                </h4>
                
                <ul>
                    <li>
                        We share the information to trusted partners who work on behalf of or with <Link to='/'> Webinar Dock </Link> under extremely strict confidentiality agreements.
                    </li>
                    <li>
                        We respond to subpoenas, court orders, or legal process, or to establish or exercise our legal rights or defend against legal claims.
                    </li>
                    <li>
                        We believe it is necessary to share information in order to investigate, prevent, or take action regarding illegal activities, suspected fraud, situations involving potential threats to the physical safety of any person, or as otherwise required by law.
                    </li>
                    <li>
                        We are also obliged to share information about you if <Link to='/'> Webinar Dock </Link> is acquired by, or merged with another company.
                    </li>
                </ul>
                
                <h4>
                    Use of External Links:
                </h4>
                
                <p>
                    <Link to='/'> Webinar Dock </Link> may provide website links to other third party websites but we are in no way responsible for the content and policies of those sites. The links are provided to you to improve your browsing experience and for your convenience only, anything that happens on those websites is beyond our control and knowledge and therefore it remains your responsibility to watch over your privacy when you use the links. We are also not liable to the information on the external links. Please note that the links may have privacy policies of their own and may send their own cookies to users, or otherwise collect data or solicit personal information.
                </p>
                
                <p>
                    By providing external links to any third-party website, we are in no way representing the said websites accuracy or vouching for the completeness of their Privacy Policy.
                </p>
            </Row>
       </Container>
    )
}

export default PrivacyPolicyPageComponent;