import React from "react";
import Tooltip from '@mui/material/Tooltip';

import './cart-item.styles.scss';

const CartItem = ({item}) => {
    const { imageUrl, name, price, quantity } = item;

    return(
        <div className='cart-item'>
            <img src= {imageUrl} alt='item'/>
            <div className='item-details'>
                <Tooltip title={name}>
                    <span className='name'>{name.dotSeparator()}</span>
                </Tooltip>
                <span className='price'>{quantity} x ${price}</span>
            </div>
        </div>
    )
}

export default CartItem;