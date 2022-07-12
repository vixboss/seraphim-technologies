import React, {useEffect, useState} from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);
const PaypalCheckoutButton = ({discountPrice, cartItems}) => {
    const [paidFor, setPaidFor] = useState(false);
    const [error, setError] = useState(null);
    
    console.log(discountPrice);
    console.log(cartItems);
    const handleApprove = (orderID) => {
        // Call backend function to fulfill order.

        // If response is success.
        setPaidFor(true);

        // Refresh user account or subscription status.

        // If the response is error
    };

    if(paidFor){
        MySwal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Thank You for your payment.',
            showConfirmButton: false,
            timer: 1500
        });
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
            totalPrice = totalPrice + (item.price * item.quantity);
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
                                value: (totalPrice - parseInt(discountPrice)).toString(),
                                breakdown: {
                                    item_total: {
                                            currency_code: "USD",
                                            value: totalPrice.toString()
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
                    console.log("order", order);

                    handleApprove(data.orderID);
                }}
                onCancel = {() => {
                    // Back to Cart
                }}
                onError = {(err) => {
                    setError(err);
                    console.log("Paypal Checkout onError", err)
                }}
            />
        </PayPalScriptProvider>
    )
}

export default PaypalCheckoutButton;