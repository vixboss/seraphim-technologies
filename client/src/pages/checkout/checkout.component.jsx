import React, {useState} from "react";
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {Row} from 'react-bootstrap';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import StripeCheckoutButton from "../../components/stripe-button/stripe-button.component";

import { selectCartItems, selectCartTotal } from './../../redux/cart/cart.selector';

import './checkout.styles.scss';

const CheckoutPage = ({cartItems, total}) => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
    // <div className='checkout-page page-border'>
    //     <div className='checkout-header'>
    //         <div className='header-block'>
    //             <span>Speaker</span>
    //         </div>
    //         <div className='header-block'>
    //             <span>Training</span>
    //         </div>
    //         <div className='header-block'>
    //             <span>Product Name</span>
    //         </div>
    //         <div className='header-block'>
    //             <span>Quantity</span>
    //         </div>
    //         <div className='header-block'>
    //             <span>Price</span>
    //         </div>
    //         <div className='header-block'>
    //             <span>Remove</span>
    //         </div>
    //     </div>
    //     {
    //         cartItems.map((cartItem, index) =>(
    //             <CheckoutItem key={index} cartItem={cartItem}/>
    //         ))
    //     }
    //     <div className='total'>
    //         <span> TOTAL: ${total} </span>
    //     </div>
    //     <div className="test-warning">
    //         *Please use the follwoing test credit card for the payments*
    //         <br/>
    //         4242 4242 4242 4242 - Exp: 01/24 -CVV: 123
    //     </div>
    //     <StripeCheckoutButton price={total} cartItems = {cartItems}/>
    // </div>

    <Row className="page-border set-margin">
        {
            cartItems.map((cartItem, index) =>(
                <CheckoutItem key={index} cartItem={cartItem}/>
            ))
        }
        <Row className="total">
            <span onClick={handleClickOpen}>Have a coupon code?</span>
            <span> TOTAL: ${total} </span>            
        </Row>
        <Row className="test-warning">
            *Please use the follwoing test credit card for the payments*
            <br/>
            4242 4242 4242 4242 - Exp: 01/24 -CVV: 123
        </Row>
        <div className="pay-button">
            <span className="pay-button-span">
                <StripeCheckoutButton price={total} cartItems = {cartItems}/>
            </span>
        </div>
        <Dialog open={open} onClose={handleClose}>
            <DialogContent>
            <TextField
                autoFocus
                margin="dense"
                id="coupon"
                label="Coupon Code"
                type="text"
                variant="standard"
            />
            </DialogContent>
            <DialogActions>
                <Button style={{color: '#6c757d'}} onClick={handleClose}>Cancel</Button>
                <Button style={{color: '#6c757d'}} onClick={handleClose}>Apply</Button>
            </DialogActions>
        </Dialog>
    </Row>

)}
const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    total: selectCartTotal
})

export default connect(mapStateToProps)(CheckoutPage);