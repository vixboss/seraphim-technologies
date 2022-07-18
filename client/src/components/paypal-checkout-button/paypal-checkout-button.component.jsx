import React, {useEffect, useState} from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import { addUserPurchaseStart } from '../../redux/user-purchase/user-purchase.action';

const MySwal = withReactContent(Swal);
const PaypalCheckoutButton = ({discountPrice, cartItems, history, addUserPurchaseStart}) => {
    const [paidFor, setPaidFor] = useState(false);
    const [error, setError] = useState(null);
    const handleApprove = (order) => {
        // Call backend function to fulfill order.
        addUserPurchaseStart({...order, merchant: 'Paypal'});
        
        // If response is success.
        setPaidFor(true);
        history.push('/shop');

        // Refresh user account or subscription status.

        // If the response is error
    };

    if(paidFor){
        setTimeout(() => {
            MySwal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Thank You for your payment.',
                showConfirmButton: false,
                timer: 1500
            });
        }, 2000);
    }

    if(error) {
        MySwal.fire({
            position: 'top-end',
            icon: 'error',
            title: error,
            showConfirmButton: false,
            timer: 1500
        });
    }

    let totalPrice = 0.00;
    useEffect(() => {
        cartItems.map((item) => {
            totalPrice = totalPrice + parseInt((item.price * item.quantity).toFixed(2));
        });
    },[]);

    return(
        <PayPalScriptProvider>
            <PayPalButtons
                style = {{
                    label: 'pay'
                }}
                createOrder = {(data, actions) => {
                    return actions.order.create({
                        purchase_units: [{
                            amount: {
                                currency_code: "USD",
                                value: (totalPrice - discountPrice).toFixed(2),
                                breakdown: {
                                    item_total: {
                                            currency_code: "USD",
                                            value: totalPrice.toFixed(2)
                                        },
                                    discount: {
                                            currency_code: "USD",
                                            value: discountPrice
                                        }
                                    }
                             },
                             items: cartItems.map((item) => {
                                return{
                                    name: item.name + '(' + item.mode + ')',
                                    unit_amount: {
                                        "currency_code": "USD",
                                        "value": item.price
                                    },
                                    quantity: item.quantity
                                }
                            })
                        }]
                    })
                }}
                onApprove = {async(data, actions) => {
                    const order = await actions.order.capture();
                    handleApprove(order);
                }}
                onCancel = {() => {
                    // Back to Cart
                    history.push('/checkout');
                }}
                onError = {(err) => {
                    setError(err);
                    console.log("Paypal Checkout onError", err)
                }}
            />
        </PayPalScriptProvider>
    )
}

const mapDispatchToProps = dispatch => ({
    addUserPurchaseStart: (purchase) => dispatch(addUserPurchaseStart(purchase))
})

export default withRouter(connect(null, mapDispatchToProps)(PaypalCheckoutButton));