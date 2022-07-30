import React, {useEffect} from 'react';
import {Container, Row} from 'react-bootstrap';

import './faq.styles.scss';

const FaqPage = () => {
    useEffect(() => {
        window.scrollTo(0,0);
    }, []);
    return(
        <Container xs = {8} xm = {8}>
            <Row md = {8} xs = {8}>
                <h2 style={{
                    textAlign: 'center', 
                    paddingTop: '30px',
                    paddingBottom: '30px'
                }}> Frequently Asked Questions</h2>
            </Row>
            <Row xs={8} xm={8} className="faq-container" style= {{textAlign: 'justify'}}>
                <div className='faq-hdr'>What training products does WebinarDock offer?</div>
                <div>
                    <ul>
                        <li><strong>1. Live Webinar</strong>
                            <p>Live webinar is a session wherein the audience or the attendees can put up questions and interact with the speaker towards the end in real time. The session generally lasts for 60-90 minutes.</p>
                        </li>
                        <li><strong>2. E-Transcript</strong>
                            <p>A transcript is a written material of the entire webinar script. You can download the soft copy of the transcript and keep it with you. This proves helpful if in case you don&rsquo;t have time to attend live webinars.</p>
                        </li>
                        <li><strong>3. On Demand</strong>
                            <p>On demand webinars are synonymous to recorded webinars. Since these webinars are recorded, you ought not to be present during the live session. You can watch the entire webinar at your own sweet time. However, during recorded sessions you will not be able to interact with the speaker. Also, recorded sessions once purchased are eligible for 20 days, if you wish to use beyond the limited time you will have to purchase it again.</p>
                        </li>
                        <li><strong>4. DVD</strong>
                            <p>A DVD is the hard copy of the entire webinar session made available to the attendees which can be bought and watched whenever required. When using DVD, you do not need an internet connection for the same.</p>
                        </li>
                    </ul>
                </div>
                <div className='faq-hdr'>How to register for above products?</div>
                <div>
                    <p>You can register for the webinar products in any of the following ways: Online Registration: Visit the website <strong>www.webinardock.com</strong> and click on subscribe now tab, fill in the form and click submit. Our customer support executive will guide you through the process. Fax/E-Mail: Email us with all your relevant details at <strong>cs@webinardock.com</strong> for registration. You will get a response within a day or two.</p>
                </div>
                <div className='faq-hdr'>Can I ask a question during or after live Webinar?</div>
                <div>
                    <p>Yes, you can settle your doubts by interacting with the speaker at the end of a live webinar. 10 minutes are reserved for Q&amp;A session.</p>
                </div>
                <div className='faq-hdr'>What is needed to attend a live Webinar?</div>
                <div>
                    <p>To attend a live webinar, all you need is a speedy internet connection and an interactive electronic gadget such as a mobile phone, personal computer or a laptop.</p>
                </div>
                <div className='faq-hdr'>What if I cannot attend the live Webinar?</div>
                <div>
                    <p>In case you miss your live webinar session, you can always go for a recorded session, an e-transcript or a DVD.</p>
                </div>
                <div className='faq-hdr'>When and how will I receive information on how to participate in live Webinar?</div>
                <div>
                    <p>Dial-In instructions to access the choosen product, which should be accessed via phone. All the participation details of the live webinar session will be sent 48 hours prior to the scheduled live webinar. You just need to download the link &amp; password for your live webinar,handouts &amp; related materials from the webinar page at <strong>www.webinardock.com</strong>. Please check your spam or junk folder in case you do not receive an email 48 hours prior to the scheduled session.</p>
                </div>
                <div className='faq-hdr'>How late can I register for a Webinar?</div>
                <div>
                    <p>We accept registration up to 30 minutes before the scheduled time of the Webinar. You can call our customer support team for dial-In instructions.</p>
                </div>
                <div className='faq-hdr'>How long will it take to receive my DVD?</div>
                <div>
                    <p>DVD is generally delivered 2 to 3 weeks after the live webinar takes place. If you need a fast delivery you can get in touch with our customer support team, the fast delivery services carry an additional charge of $30. There are also additional shipping charges if you wish to receive the DVD outside of the US.</p>
                </div>
                <div className='faq-hdr'>How long will it take to receive my e-Transcript?</div>
                <div>
                    <p>E-Transcript is emailed to you 1 to 2 weeks after the live webinar.</p>
                </div>
            </Row>
       </Container>
    );
}   

export default FaqPage;