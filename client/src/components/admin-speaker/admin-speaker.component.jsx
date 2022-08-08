import React, {useEffect, useState} from 'react';
import { Form, Container, Col, Row } from 'react-bootstrap';


import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import './admin-speaker.styles.scss';

const AdminSpeaker = () => {
    const [speaker, setSpeaker] = useState({
        id: '', 
        title: '',
        url: ''
    });
    const [buttonName, setButtonName] = useState('Submit');

    const {id,title, url} = speaker;
    
    const addSpeaker = async(event) =>{
        event.preventDefault();
        if(speaker.id === ''){
            const prodTitle = {};
            prodTitle.title = speaker.title.toLowerCase();
            // addspeakerStart(prodTitle);
        }
        else{
            const prodTitle = {};
            prodTitle.id = speaker.id;
            prodTitle.title = speaker.title.toLowerCase();
            // updatespeakerStart(speaker);
        }
    }
    const handleChange = (event) => {
        const {name, value} = event.target;
        setSpeaker({ ...speaker, [name]: value });
    }
    const cancelChange = () => {
        setSpeaker({id: '', title: ''});
        setButtonName('Submit');
    }

    const updateTitle = (type) => {
        const {id, title} = type
        setSpeaker({'id': id, 'title': title});
        setButtonName('Update');
    }

    const deletespeaker = (type) => {
        const {id} = type;
        // deletespeakerStart(id);
    }

    // useEffect(() => {
    //     cancelChange(); 
    // },[productType]);

    useEffect(() => {
        // getAllspeakerStart();
    }, [])
    return(
        <Container>
            <Col className='admin-speaker'>
                <Row>
                    <h1>Speakers</h1>
                </Row>
                <Row className='title-field'>
                    <Form onSubmit={addSpeaker}>
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
                            <Col className="URL" md = {6} xs={6} xm={6}>
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
                        <Row>
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
                {/*<div className='title-table'>
                    // <ProductTitleListContainer productType={productType} updateTitle={updateTitle} deleteProductTitle={deleteProductTitle}/>
                                </div>*/}
            </Col>
        </Container>
    )
}

export default AdminSpeaker;