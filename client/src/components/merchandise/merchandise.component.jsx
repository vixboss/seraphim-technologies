import React, { useState, useEffect } from 'react';
import { Row, Col, Container, Form} from 'react-bootstrap'; 


import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import './merchandise.styles.scss';

const MerchandiseComponent = () => {
    const [merchandiseTitle, setMerchandiseTitle] = useState({id: '', title: ''});
    const [buttonName, setButtonName] = useState('Submit');

    const {id,title} = merchandiseTitle;
    
    const addmerchandiseTitle = async(event) =>{
        event.preventDefault();
        if(merchandiseTitle.id === ''){
            const merchandTitle = {};
            merchandTitle.title = merchandiseTitle.title.toLowerCase();
            // addmerchandiseTitleStart(merchandTitle);
        }
        else{
            const merchandTitle = {};
            merchandTitle.id = merchandiseTitle.id;
            merchandTitle.title = merchandiseTitle.title.toLowerCase();
            // updatemerchandiseTitleStart(merchandiseTitle);
        }
    }
    const handleChange = (event) => {
        const {name, value} = event.target;
        setMerchandiseTitle({ ...merchandiseTitle, [name]: value });
    }
    const cancelChange = () => {
        setMerchandiseTitle({id: '', title: ''});
        setButtonName('Submit');
    }

    const updateTitle = (type) => {
        const {id, title} = type
        setMerchandiseTitle({'id': id, 'title': title});
        setButtonName('Update');
    }

    const deletemerchandiseTitle = (type) => {
        const {id} = type;
        // deletemerchandiseTitleStart(id);
    }

    // useEffect(() => {
    //     // cancelChange(); 
    // },[productType]);

    // useEffect(() => {
    //     // getAllmerchandiseTitleStart();
    // }, [])

    return(
        <>
             <Container>
            <Col className='admin-title'>
                <Row>
                    <h1>Merchandise Title</h1>
                </Row>
                <Row className='title-field'>
                    <Form onSubmit={addmerchandiseTitle}>
                        <Row>
                            <Col className="title">
                                <FormInput
                                    type="input"
                                    name="title"
                                    value={title}
                                    handleChange={handleChange}
                                    label="Title"
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
                <div className='title-table'>
                    {/* <MerchandiseTitleListContainer productType={productType} updateTitle={updateTitle} deleteProductTitle={deleteProductTitle}/> */}
                </div>
            </Col>
        </Container>
        </>
    );
}

export default MerchandiseComponent;