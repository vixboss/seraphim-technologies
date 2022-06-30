import React, {useEffect, useState} from 'react';
import { Table, Form, Container, Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import ProductTitleListContainer from '../product-title-list/product-title-list.container';
import { addProductTitleStart, updateProductTitleStart, deleteProductTitleStart, getAllProductTitleStart } from './../../redux/product/product.action';
import { selectProductType } from '../../redux/product/product.selector';
import './admin-title.styles.scss';

const AdminTitle = ({productType, getAllProductTitleStart, addProductTitleStart,  updateProductTitleStart, deleteProductTitleStart}) => {
    const [productTitle, setProductTitle] = useState({id: '', title: ''});
    const [buttonName, setButtonName] = useState('Submit');

    const {id,title} = productTitle;
    
    const addProductTitle = async(event) =>{
        event.preventDefault();
        if(productTitle.id === ''){
            const prodTitle = {};
            prodTitle.title = productTitle.title.toLowerCase();
            addProductTitleStart(prodTitle);
        }
        else{
            const prodTitle = {};
            prodTitle.id = productTitle.id;
            prodTitle.title = productTitle.title.toLowerCase();
            updateProductTitleStart(productTitle);
        }
    }
    const handleChange = (event) => {
        const {name, value} = event.target;
        setProductTitle({ ...productTitle, [name]: value });
    }
    const cancelChange = () => {
        setProductTitle({id: '', title: ''});
        setButtonName('Submit');
    }

    const updateTitle = (type) => {
        const {id, title} = type
        setProductTitle({'id': id, 'title': title});
        setButtonName('Update');
    }

    const deleteProductTitle = (type) => {
        const {id} = type;
        deleteProductTitleStart(id);
    }

    useEffect(() => {
        cancelChange(); 
    },[productType]);

    useEffect(() => {
        getAllProductTitleStart();
    }, [])

    return(
        <Container>
            <Col className='admin-title'>
                <Row>
                    <h1>Product Type</h1>
                </Row>
                <Row className='title-field'>
                    <Form onSubmit={addProductTitle}>
                    {/*
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintext">
                            <Form.Label column sm="2">
                                Title
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control className="title"/>
                            </Col>
                        </Form.Group>

                        {/************ Button Addition ********/}
                        {/*
                        <Row className='justify-content-md-center mb-5'>
                            <Col xs lg="2">
                                <Button className="pull-right" variant="primary">Submit</Button>
                            </Col>
                            <Col xs lg="2">
                                <Button variant="danger" type="submit">Cancel</Button>
                            </Col>
                        </Row> */}
                        {/*************************************/}
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
                    <ProductTitleListContainer productType={productType} updateTitle={updateTitle} deleteProductTitle={deleteProductTitle}/>
                </div>
            </Col>
        </Container>
    )
}

const mapDispatchToProps = dispatch => ({
    addProductTitleStart: (title) => dispatch(addProductTitleStart(title)),
    updateProductTitleStart: (data) => dispatch(updateProductTitleStart(data)),
    deleteProductTitleStart: (id) => dispatch(deleteProductTitleStart(id)),
    getAllProductTitleStart: () => dispatch(getAllProductTitleStart())
});
const mapStateToProps = createStructuredSelector({
    productType: selectProductType
});
export default connect(mapStateToProps, mapDispatchToProps)(AdminTitle);