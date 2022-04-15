import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';

import './refund-cancellation.styles.scss';

const RefundAndCancellationPageComponent = () => {
    return (
       <Container>
            <Row md = {8} xs = {8}>
                <h2 style={{
                    textAlign: 'center', 
                    paddingTop: '30px',
                    paddingBottom: '30px'
                }}> Refund & Cancellation </h2>
            </Row>
            <Row md = {8} xs = {8} className="refund-container">
                <p>
                    What are your policies concerning cancellations, substitutions and or refunds?
                </p>

                <h4>
                    Cancellations (Only applicable for Live conferences):
                </h4>
                
                <p>
                    Our cancellation policy for live conferences is as follows:
                </p>
                
                <ul>
                    <li>
                        Cancellations are allowed and accepted for live conferences only if the request to cancel is placed at least 72 hours before the scheduled time of the conference. Requests placed under 48hrs will not be accepted. Cancellations to webinars are refundable, only a small fee of $30 is deducted and used for processing the request.
                    </li>
                    <li>
                        In case you are not able to participate in a webinar that you registered for, please let us know as early as you possibly can.
                    </li>
                </ul>
                
                <h4>
                    Substitution (Only applicable for Live conferences):
                </h4>
                <p>
                    Our Substitution policy for live conferences is as follows:
                </p>
                <ul>
                    <li>
                        Participants can opt for a substitution in place of a cancellation so as to avoid the processing fee that comes with cancelling.
                    </li>
                    <li>
                        Substitution can either be replacing a webinar with another webinar at a different time or day, or it can be the substitution of the registered participant with another person taking their place.
                    </li>
                    <li>
                        Substitution is free but we require notification in good time.
                    </li>
                </ul>
                <h4>
                    Below are cases and situations in which we do not allow Substitutions and Cancellations:
                </h4>
                <ul>
                    <li>
                        Substitution/Cancellation is not allowed if the attendee missed the scheduled session
                    </li>
                    <li>
                        If the attendee or participant does not get webinar information due to issues like bounced emails, restricted emails or any other system issues on the attendee or participants end.
                    </li>
                    <li>
                        We do not offer refunds for on-demand webinars
                    </li>
                </ul>

                <h4>
                    Our REFUND Policy:
                </h4>
                
                <p>
                    The following is our refund policy for Live, Pre-Recorded, On demand webinars and audio conferences:
                </p>
                <ul>
                    <li>
                        If <Link to='/'>Webinar Dock</Link> cancels a webinar due to technical fault or related challenges, 100% refund of the participation fees is done.
                    </li>
                    <li>
                        We do not offer any refunds in cases where a participant did not receive the webinar instructions and they did not inform the customer services department. In case a participant does not receive the log in instructions it is their responsibility to contact customers services at least 24hrs before the scheduled time of the webinar. Customer services can be contacted at cs@webinardock.com by opening a ticket. Only then we will be able to do a follow up and assist you.
                    </li>
                    <li>
                        No refund will be offered to participants who do not receive the log in instruction due to a system or a technical glitch on their end.
                    </li>
                </ul>

                <h4>
                    Special Scenarios:
                </h4>

                <p>
                    The following is our refund policy for Live, Pre-Recorded, On demand webinars and audio conferences:
                </p>
                <ul>
                    <li>
                        If <Link to='/'>Webinar Dock</Link> cancels a webinar due to technical fault or related challenges, 100% refund of the participation fees are refunded.
                    </li>
                    <li>
                        We do not offer any refunds in cases where a participant did not receive the webinar instructions and they did not inform the customer services department. In case a participant does not receive the log in instructions it is their responsibility to contact customers services at least 24hrs before the scheduled time of the webinar. Customer services can be contacted at cs@webinardock.com by opening a ticket. Only then we will be able to do a follow up and assist you.
                    </li>
                    <li>
                        No refund will be offered to participants who do not receive the log in instruction due to a system or a technical glitch on their end.
                    </li>

                </ul>

                <h4>
                    REFUND Policy For DVD
                </h4>
                <ul>
                    <li>
                        100% refund if the DVD is damaged during delivery or malfunctioning. The refund is subject to the participant submitting evidence.
                    </li>
                    <li>
                        100% refund if the DVD is missing or is lost during delivery.
                    </li>
                </ul>

                <h4>
                    REFUND Policy For Digital Downloads including Transcripts
                </h4>
                <ul>
                    <li>
                        No refund is offered in cases of digital downloads and transcripts.
                    </li>
                </ul>
            </Row>
       </Container>
    )
}

export default RefundAndCancellationPageComponent;