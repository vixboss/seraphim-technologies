import React from "react";
import Button from '@mui/material/Button';
import { withRouter } from 'react-router-dom';


const PaymentOptionComponent = ({discountPrice, cartItems, history}) => {
    return(
        <>  
            <Button variant="contained" onClick={() => history.push({
                pathname: '/payment',
                state: {
                    discountPrice: discountPrice,
                    cartItems: cartItems
                }
            })}>
                <i className="fa fa-credit-card" aria-hidden="true"></i>    
                &nbsp; Pay Now
            </Button>        
        </>
    )
}

export default withRouter(PaymentOptionComponent);