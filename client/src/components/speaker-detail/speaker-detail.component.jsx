import React from 'react';
import { withRouter } from 'react-router-dom';
import {Container, Row, Col} from 'react-bootstrap';

import './speaker-detail.styles.scss';

const SpeakerDetailComponent =({history}) => {

    const speaker = history.location.state.data;
    console.log(speaker);
    return(
        <Container>
            <Row>
                <h2 style={{
                    textAlign: 'center', 
                    paddingTop: '30px',
                    }}> Speaker</h2>
            </Row>
            <Row style= {{marginTop: '40px', marginBottom: '20px'}}>
                <Col md = {4}>
                    <Row>
                        <img 
                            src = {speaker.url} 
                            style = {{
                                height: 'auto', 
                                width: '50%', 
                                borderRadius: '20%', 
                                marginLeft: 'auto', 
                                marginRight: 'auto',
                                marginBottom: '20px'
                            }}
                            alt = {speaker.title}
                        />
                    </Row>
                    <Row style = {{textAlign: 'center'}}>
                        <h4 style = {{color: 'rgb(26, 165, 216)', fontWeight: '800'}}>{speaker.title}</h4>
                    </Row>
                    <Row style = {{textAlign: 'center'}}>
                        <h5>{`(${speaker.qualification})`}</h5>
                    </Row>
                </Col>
                <Col md = {8}>
                    <Row>
                        <p style = {{fontSize: '18px'}} align ="justify"><strong> {`${speaker.title}, `}</strong>{`${speaker.description}`}</p>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default withRouter(SpeakerDetailComponent);