import React from "react";
import { withRouter } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';

import {ReactComponent as StripeSvg} from '../../assets/stripe-powered.svg';
import StripeCheckoutButton from "../../components/stripe-button/stripe-button.component";
import PaypalCheckoutButton from "../../components/paypal-checkout-button/paypal-checkout-button.component";

import './payment-page.component.styles.scss';

const PaymentPage = ({location}) => {
    const {discountPrice, cartItems} = location.state;

    return (
        <Container className="payment-container">  
            <Row>
                <Col md = {4}>
                    <StripeCheckoutButton discountPrice={discountPrice} cartItems = {cartItems}/>
                    <StripeSvg height={40} width = 'auto'/>
                </Col>
                <Col md = {4}>
                    <Divider orientation="vertical">
                        <Chip label="OR" />
                    </Divider>
                </Col>
                <Col md = {4}>
                    <PaypalCheckoutButton discountPrice={discountPrice} cartItems = {cartItems}
                    />
                </Col>
            </Row>
        </Container>
    )
}

export default withRouter(PaymentPage);