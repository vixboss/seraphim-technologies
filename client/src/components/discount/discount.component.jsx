import React, { useEffect, useState } from 'react';
import {Row, Col, Container, Form, DropdownButton, Dropdown} from 'react-bootstrap';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { getAllDiscountStart, addDiscountStart, updateDiscountStart, deleteDiscountStart } from '../../redux/discount/discount.action';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { selectAllDiscount } from '../../redux/discount/discount.selector';
import DiscountListContainer from '../discount-list/discount-list.container';

import './discount.style.scss';

const DiscountComponent = ({getAllDiscountStart, addDiscountStart, allDiscount, updateDiscountStart, deleteDiscountStart}) => {

    const [discount, setDiscount] = useState({
        discountId: '',
        discountName: '',
        discountType: 'Select Type',
        discountValue: '',
        discountValidity: '',
        discountCategory: 'Select Category'
    });
    const [buttonName, setButtonName] = useState('submit');
    const [discountCriteria, setDiscountCriteria] = useState([
        {
            type: '$'
        },
        {
            type: '%'
        }
    ]);
    const [discountCategoryCriteria, setDiscountCategoryCriteria] = useState([
        {
            category: 'Normal'
        },
        {
            category: 'Special'
        }
    ]);

    const addDiscount = (e) => {
        e.preventDefault();
        if(discount.discountId === ''){
            addDiscountStart(discount);
        }
        else{
            updateDiscountStart(discount)
        }
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setDiscount({...discount, [name]: value});
    }

    const cancelChange = () => {
        setDiscount({
            discountId: '',
            discountName: '',
            discountType: 'Select Type',
            discountValue: '',
            discountValidity: '',
            discountCategory: 'Select Category'
        });
        setDiscountCriteria(
            [
                {
                    type: '$'
                },
                {
                    type: '%'
                }
            ]
        );
        setDiscountCategoryCriteria(
            [
                {
                    category: 'Normal'
                },
                {
                    category: 'Special'
                }
            ]
        );
        setButtonName('Submit');
    }

    const typeDropdownChange = (e) => {
        const value = e.target.innerHTML.toLowerCase();
        setDiscount({...discount, discountType: value});
    }

    const categoryDropdownChange = (e) => {
        const value = e.target.innerHTML.toLowerCase();
        setDiscount({...discount, discountCategory: value});
    }

    useEffect(() => {
        cancelChange();
    }, [allDiscount]);

    useEffect(() => {
        getAllDiscountStart();
    }, []);

    const updateDiscount = (value) => { 
        setDiscount({
            discountId: value._id,
            discountName: value.name,
            discountType: value.type,
            discountCategory: value.category,
            discountValue: value.value.toString(),
            discountValidity: value.validity.toString()
        });

        setButtonName('Update');
    }

    const deleteDiscount = (id) => {
        deleteDiscountStart(id);
    }
    return (
        <Container>
            <Col className='admin-discount'>
                <Row>
                    <h1>Discount</h1>
                </Row>
                <Row className='discount-field'>
                    <Form onSubmit={addDiscount}>
                        <Row>
                            <Col className="discount" md={3} xm = {3} xs = {3}>
                                <FormInput
                                    type="input"
                                    name="discountName"
                                    value={discount.discountName}
                                    handleChange={handleChange}
                                    label="Discount Name"
                                    required
                                />
                            </Col>
                            <Col className="discount" md= {3} xm = {3} xs = {3}>
                                <FormInput
                                    type="input"
                                    name="discountValue"
                                    value={discount.discountValue}
                                    handleChange={handleChange}
                                    label="Value In Numbers"
                                    onKeyPress={(event) => {
                                        if (!/[0-9]/.test(event.key)) {
                                          event.preventDefault();
                                        }
                                    }}
                                    onPaste={(e)=>{
                                        e.preventDefault()
                                        return false;
                                    }} 
                                    onCopy={(e)=>{
                                        e.preventDefault()
                                        return false;
                                    }} 
                                    required
                                />
                            </Col>
                            <Col className="discount" md= {3} xm = {3} xs = {3}>
                                <DropdownButton 
                                    id="dropdown-basic-button" 
                                    title= {discount.discountType} 
                                    className="center-item"
                                    required
                                >
                                {
                                    discountCriteria.map((discount, index) => {
                                        return(
                                            <Dropdown.Item key={index}
                                                onClick = {(e) => typeDropdownChange(e)}
                                            >
                                            {discount.type}
                                            </Dropdown.Item>
                                        )
                                    })
                                }
                                </DropdownButton>
                            </Col>
                            <Col className="discount" md= {3} xm = {3} xs = {3}>
                                <DropdownButton 
                                    id="dropdown-basic-button" 
                                    title= {discount.discountCategory} 
                                    className="center-item"
                                    required
                                >
                                {
                                    discountCategoryCriteria.map((discount, index) => {
                                        return(
                                            <Dropdown.Item key={index}
                                                onClick = {(e) => categoryDropdownChange(e)}
                                            >
                                            {discount.category}
                                            </Dropdown.Item>
                                        )
                                    })
                                }
                                </DropdownButton>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="discount" md= {4} xm = {4} xs = {4}>
                                <FormInput
                                    type="input"
                                    name="discountValidity"
                                    value={discount.discountValidity}
                                    handleChange={handleChange}
                                    label="Exp. time in Hrs."
                                    onKeyPress={(event) => {
                                        if (!/[0-9]/.test(event.key)) {
                                        event.preventDefault();
                                        }
                                    }}
                                    onPaste={(e)=>{
                                        e.preventDefault()
                                        return false;
                                    }} 
                                    onCopy={(e)=>{
                                        e.preventDefault()
                                        return false;
                                    }} 
                                    required
                                />
                            </Col>
                        </Row>
                        <Row md= {12}>
                            <Col className='buttons' md={4}>
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
                <div className='discount-table'>
                    <DiscountListContainer allDiscount = {allDiscount} updateDiscount = {updateDiscount} deleteDiscount = {deleteDiscount}/>
                </div>
            </Col>
        </Container>
    );
}

const mapDispatchToProps = (dispatch) =>({
    getAllDiscountStart: () => dispatch(getAllDiscountStart()),
    addDiscountStart: (data) => dispatch(addDiscountStart(data)),
    updateDiscountStart: (data) => dispatch(updateDiscountStart(data)),
    deleteDiscountStart: (id) => dispatch(deleteDiscountStart(id))
});

const mapStateToProps = createStructuredSelector({
    allDiscount: selectAllDiscount
});

export default connect(mapStateToProps, mapDispatchToProps)(DiscountComponent);
