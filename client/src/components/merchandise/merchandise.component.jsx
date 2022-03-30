import React, { useState, useEffect } from 'react';
import { Row, Col, Container, Form} from 'react-bootstrap'; 
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {selectMerchandiseTitle} from '../../redux/merchandise/merchandise.selector';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import MerchandiseListContainer from '../merchandise-list/merchandise-list.container';
import { 
        addMerchandiseTitleStart, 
        updateMerchandiseTitleStart, 
        deleteMerchandiseTitleStart, 
        getAllMerchandiseTitleStart 
    } from '../../redux/merchandise/merchandise.action';

import './merchandise.styles.scss';

const MerchandiseComponent = ({getAllMerchandiseTitleStart, addMerchandiseTitleStart, updateMerchandiseTitleStart, deleteMerchandiseTitleStart,merchandise}) => {
    const [merchandiseTitle, setMerchandiseTitle] = useState({id: '', title: ''});
    const [buttonName, setButtonName] = useState('Submit');

    const {id,title} = merchandiseTitle;
    
    const addmerchandiseTitle = async(event) =>{
        event.preventDefault();
        if(merchandiseTitle.id === ''){
            const merchandTitle = {};
            merchandTitle.title = merchandiseTitle.title.toLowerCase();
            addMerchandiseTitleStart(merchandTitle);
        }
        else{
            const merchandTitle = {};
            merchandTitle.id = merchandiseTitle.id;
            merchandTitle.title = merchandiseTitle.title.toLowerCase();
            updateMerchandiseTitleStart(merchandiseTitle);
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

    const deleteMerchandiseTitle = (type) => {
        const {id} = type;
        deleteMerchandiseTitleStart(id);
    }

    useEffect(() => {
        cancelChange(); 
    },[merchandise]);

    useEffect(() => {
        getAllMerchandiseTitleStart();
    }, [])

    return(
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
                    <MerchandiseListContainer 
                        merchandise = { merchandise }
                        updateTitle = { updateTitle }
                        deleteMerchandiseTitle = { deleteMerchandiseTitle }
                    /> 
                </div>
            </Col>
        </Container>
    );
}

const mapDispatchToProps = dispatch => ({
    addMerchandiseTitleStart: title => dispatch(addMerchandiseTitleStart(title)),
    getAllMerchandiseTitleStart: () => dispatch(getAllMerchandiseTitleStart()),
    updateMerchandiseTitleStart: title => dispatch(updateMerchandiseTitleStart(title)),
    deleteMerchandiseTitleStart: id => dispatch(deleteMerchandiseTitleStart(id))
});

const mapStateToProps = createStructuredSelector({
    merchandise: selectMerchandiseTitle
});

export default connect(mapStateToProps, mapDispatchToProps)(MerchandiseComponent);