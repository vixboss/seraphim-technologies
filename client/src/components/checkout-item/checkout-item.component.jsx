import React from "react";
import { connect } from 'react-redux';

import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import { clearItemFromCart, addItem, removeItem, increaseQty } from "../../redux/cart/cart.action";
import './checkout-item.styles.scss';

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  });

const CheckoutItem = ({cartItem, clearItem, addItem, removeItem, increaseQty}) => {
    const {name, price, imageUrl, quantity, mode} = cartItem;
    return(
        // <div className='checkout-item'>
        //     <div className='image-container'>
        //         <img src={imageUrl} alt='item'/>
        //     </div>
        //     <span className='name'>{name}</span>
        //     <span className='quantity'>
        //         <div className='arrow' onClick={() => removeItem(cartItem)}>&#10094;</div>
        //         <span className='value'>{quantity}</span>  
        //         <div className='arrow' onClick={() => addItem(cartItem)}>&#10095;</div>
        //     </span>
        //     <span className='price'>${price}</span>
        //     <div className='remove-button' onClick={() => clearItem(cartItem)}>&#10005;</div>

        // </div>

        // ***************** New Code ****************
        // <div className='checkout-item'>
        //     <div className='image-container'>
        //         <img src={imageUrl} alt='item'/>
        //     </div>
        //     <span className='name'>{name}</span>
        //     <span className='mode'>{mode}</span>
        //     <span className='quantity'>
        //         <div className='arrow' onClick={() => removeItem(cartItem)}>&#10094;</div>
        //         <span className='value'>{quantity}</span>  
        //         <div className='arrow' onClick={() => increaseQty([cartItem])}>&#10095;</div>
        //     </span>
        //     <span className='price'>${price}</span>
        //     <div className='remove-button' onClick={() => clearItem(cartItem)}>&#10005;</div>
        // </div>

        <Paper spacing = {2}
            sx={{
                p: 2,
                margin: 'auto',
                maxWidth: 800,
                marginTop: '20px',
                flexGrow: 1,
                backgroundColor: (theme) =>
                theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
            }}
        >
            <Grid container spacing={2}>
                <Grid item>
                    <ButtonBase sx={{ width: 128, height: 128 }}>
                        <Img alt="item" src={imageUrl} />
                    </ButtonBase>
                </Grid>
                <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={3}>
                        <Grid item xs>
                        <Typography gutterBottom variant="subtitle1" component="div">
                            {name}
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                            {mode}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            <span className='quantity'>
                                <Tooltip title="Decrease Product Quantity">  
                                    <span style={{cursor: 'pointer'}} onClick={() => removeItem(cartItem)}>&#10094;</span>
                                </Tooltip>
                                <span className='value'> { quantity } </span>  
                                <Tooltip title="Increase Product Quantity">
                                    <span style={{cursor: 'pointer'}} onClick={() => increaseQty([cartItem])}>&#10095;</span>
                                </Tooltip>
                            </span>
                        </Typography>
                        </Grid>
                        <Grid item>
                        <Typography variant="body2">
                            <Tooltip title="Remove Product">
                            <IconButton style={{cursor: 'pointer'}} onClick={() => clearItem(cartItem)}>
                                <DeleteIcon />
                            </IconButton>
                            </Tooltip>
                        </Typography>
                        </Grid>
                    </Grid>
                <Grid item>
                    <Typography variant="subtitle1" component="div">
                        <strong>
                            ${price}
                        </strong>   
                    </Typography>
                </Grid>
                </Grid>
            </Grid>
        </Paper>
    )
}

const mapDispatchToProps = dispatch => ({
    clearItem: item => dispatch(clearItemFromCart(item)),
    // addItem: item => dispatch(addItem(item)),
    removeItem: item => dispatch(removeItem(item)),
    increaseQty: item => dispatch(increaseQty(item))
});
export default connect(null, mapDispatchToProps)(CheckoutItem);