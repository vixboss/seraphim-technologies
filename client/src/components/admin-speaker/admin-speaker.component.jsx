import React, {useEffect, useState} from 'react';
import { createStructuredSelector } from 'reselect';
import { Form, Container, Col, Row, FloatingLabel } from 'react-bootstrap';
import {connect} from 'react-redux';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import {addSpeakerStart, getSpeakerStart, updateSpeakerStart, deleteSpeakerStart} from '../../redux/speaker/speaker.action';
import { selectAllSpeakers } from '../../redux/speaker/speaker.selector';
import SpeakerListContainer from '../speaker-list/speaker-list.container';

import './admin-speaker.styles.scss';

const AdminSpeaker = ({addSpeakerStart, getSpeakerStart, allSpeakers, updateSpeakerStart, deleteSpeakerStart}) => {
    const [speaker, setSpeaker] = useState({
        id: '', 
        title: '',
        url: '',
        description:'',
        qualification: ''
    });
    const [buttonName, setButtonName] = useState('Submit');

    const {id,title, url, description, qualification} = speaker;
    
    const addSpeaker = async(event) =>{
        event.preventDefault();
        if(speaker.id === ''){
            addSpeakerStart(speaker);
        }
        else{
            updateSpeakerStart(speaker);
        }
    }
    const handleChange = (event) => {
        const {name, value} = event.target;
        setSpeaker({ ...speaker, [name]: value });
    }
    const cancelChange = () => {
        setSpeaker({id: '', title: '', url: '', description: '', qualification: ''});
        setButtonName('Submit');
    }

    const updateTitle = (type) => {
        const {_id, title, url, description, qualification} = type
        setSpeaker({'id': _id, 'title': title, 'url': url, 'description': description, 'qualification': qualification});
        setButtonName('Update');
    }

    const deleteSpeaker = (type) => {
        const {_id} = type;
        deleteSpeakerStart(_id);
    }

    useEffect(() => {
        cancelChange(); 
    },[allSpeakers]);

    useEffect(() => {
        getSpeakerStart();
    }, [getSpeakerStart])
    return(
        <Container>
            <Col className='admin-speaker'>
                <Row>
                    <h1>Speakers</h1>
                </Row>
                <Row>
                    <Form onSubmit={addSpeaker}>
                        <Row>
                            <Col md={6} lg={6}>
                                <Row>
                                    <Col className="speaker-name" md = {6} xs={6} xm={6}>
                                        <FormInput
                                            type="input"
                                            name="title"
                                            value={title}
                                            handleChange={handleChange}
                                            label="Title"
                                            required
                                        />
                                    </Col>
                                    <Col md = {6} xs={6} xm={6}>
                                        <FormInput
                                            type="input"
                                            name="qualification"
                                            value={qualification}
                                            handleChange={handleChange}
                                            label="Qualification"
                                            required
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <FormInput
                                            type="input"
                                            name="url"
                                            value={url}
                                            handleChange={handleChange}
                                            label="URL"
                                            required
                                        />
                                    </Col>
                                </Row>
                            </Col>
                            <Col md={6} lg={6}>
                                <Row>
                                    <Col lg md style = {{paddingBottom: '20px', paddingTop: '40px'}}>
                                        <FloatingLabel controlId="floatingTextarea" name="description" label="Description">
                                            <Form.Control
                                            as="textarea"
                                            name="description"
                                            value={description}
                                            placeholder="Leave a speaker description here"
                                            style={{ height: '192px' }}
                                            onChange={handleChange}
                                            />
                                        </FloatingLabel>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>

                        <Row className = 'title-field'>
                            <Col className='buttons'>
                                <CustomButton
                                    type="submit"
                                    value="submit"
                                    isNormalSubmitButton
                                >
                                    { 
                                        buttonName
                                    }
                                </CustomButton>
                                <CustomButton
                                    value="Cancel"
                                    onClick = {cancelChange}
                                    isNormalCancelButton
                                >
                                    Cancel
                                </CustomButton>
                            </Col>
                        </Row>
                    </Form>
                </Row>
                <div>
                    <SpeakerListContainer speakerList={allSpeakers} updateTitle={updateTitle} deleteSpeaker={deleteSpeaker}/>
                </div>
            </Col>
        </Container>
    )
}

const mapStateToProps = createStructuredSelector({
    allSpeakers: selectAllSpeakers
});
const mapDispatchToProps = dispatch => ({
    addSpeakerStart: (data) => dispatch(addSpeakerStart(data)),
    getSpeakerStart: () => dispatch(getSpeakerStart()),
    updateSpeakerStart: (data) => dispatch(updateSpeakerStart(data)),
    deleteSpeakerStart: (data) => dispatch(deleteSpeakerStart(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminSpeaker);