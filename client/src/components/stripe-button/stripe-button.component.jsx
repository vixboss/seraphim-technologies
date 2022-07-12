import React from "react";
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { withRouter } from 'react-router';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import Button from '@mui/material/Button';
import { host } from '../../api.config';
import { ReactComponent as StripeLogo } from './../../assets/Stripe.svg';

import { clearCart } from '../../redux/cart/cart.action';
import { selectCurrentUser }  from '../../redux/user/user.selector';

import './stripe-button.styles.scss';

const MySwal = withReactContent(Swal);

const StripeCheckoutButton = ({discountPrice, history, clearCart, currentUser, cartItems}) => {
    const discountPriceForStripe = discountPrice * 100;
    // const publishableKey = 'pk_test_51Jp5Q6SFe3HyXD2syryE9oomRsf33oRj1UD3A3AKGQHAjNl2ATfQqRfTP0ScBy12aXDxb3IvqG5TxXZrV44xlQHV00sjGGemup';
    // const onToken = token => {
    //     axios({
    //         url: 'stripe',
    //         method: 'post',
    //         data:{
    //             amount: priceForStripe,
    //             token
    //         }
    //     }).then((response) => {
    //         if(response.status === 200){
    //             MySwal.fire({
    //                 position: 'top-end',
    //                 icon: 'success',
    //                 title: 'Payment Successful',
    //                 showConfirmButton: false,
    //                 timer: 1500
    //             });

    //             clearCart();
    //             history.push('/shop');
    //         }
    //     }).catch((error) => {
    //         if(error.status === 500){
    //             console.error('Payment Error: ', JSON.parse(error));
    //             MySwal.fire({
    //                 position: 'top-end',
    //                 icon: 'error',
    //                 title: 'There was an issue with your payment. Please make sure use the provided credit card.',
    //                 showConfirmButton: false,
    //                 timer: 1500
    //             });
    //         }
    //     });
    // }

    const payment = () => {
        axios({
            url: `${host}/api/stripe`,
            method: 'POST',
            data: {
                    cartItems,
                    currentUser,
                    discountPriceForStripe
                },  
        }).then((response) => {
            if(response.status === 200){
                // MySwal.fire({
                //     position: 'top-end',
                //     icon: 'success',
                //     title: 'Payment Successful',
                //     showConfirmButton: false,
                //     timer: 1500
                // });

                // clearCart();
                // history.push('/shop');
                const url = response.data.url;
                window.location = url;
            }
        }).catch((error)=>{
            MySwal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'There was an issue with your payment. Please make sure use the provided credit card.',
                showConfirmButton: false,
                timer: 1500
            });
            
        });
    }
    return(
        <>
            {/*{

                currentUser !== null ? <StripeCheckout
                    label='Pay Now'
                    name='Seraphim Technologies Pvt. Ltd.'
                    billingAddress
                    shippingAddress
                    image='https://svgshare.com/i/CUz.svg'
                    description={`Your Total is $${price}`}
                    amount={priceForStripe}
                    panelLabel='Pay Now'
                    token={onToken}
                    stripeKey={publishableKey}
                /> :
                <Button variant="contained" onClick={() => history.push('/signin')}>
                    Sign In for payment.
                </Button>
            } */}

            <Button variant="contained" onClick={payment} className = 'button'>
                <span style= {{ color: 'black', textTransform:'none', fontSize: '16px'}}>Pay with</span>
                <StripeLogo height = {50} width = {80}/>
            </Button>
        </>
        

    )
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
});
const mapDispatchToProps = dispatch => ({
    clearCart: () => dispatch(clearCart())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StripeCheckoutButton));