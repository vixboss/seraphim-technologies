import React, {useState} from 'react';
import {connect} from 'react-redux';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import {Row} from 'react-bootstrap';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import { addItem } from '../../redux/cart/cart.action';
import {removeWishlistStart} from '../../redux/wishlist/wishlist.action';

const Img = styled('img')(({ theme }) => ({
    ...theme.typography.body2,
    color: theme.palette.text.secondary,
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
}));

const lightTheme = createTheme({ palette: { mode: 'light' } });

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

const WishlistItemComponent = ({wishlist, removeWishlistStart, addItem}) => {
    const { image, mode, name, price, _id, email, productId } = wishlist;
    console.log(wishlist);
    const handleRemove = (id, email) => {
        removeWishlistStart({id, email});
    }

    const handleCart = (image, mode, name, price, productId) => {
        const items = {
            'id': productId,
            'price': price,
            'mode': mode.capitalizeFirstCharacter(),
            'imageUrl': image,
            'name': name,
            'quantity': 1
        }
        addItem([items]);
        handleClick();
    }

    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        setOpen(false);
    };

    return(
        <ThemeProvider theme={lightTheme}>
            <Paper spacing = {2}
                sx={{
                    p: 2,
                    margin: 'auto',
                    maxWidth: 800,
                    marginTop: '20px',
                    flexGrow: 1,
                    // backgroundColor: (theme) =>
                    // theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                }}
                style = {{marginBottom: '30px'}}
            >
                <Grid container spacing={2}>
                    <Grid item>
                        <ButtonBase sx={{ width: 128, height: 128 }}>
                            <Img alt="item" src={image} />
                        </ButtonBase>
                    </Grid>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={3}>
                            <Grid item xs>
                                <Typography gutterBottom variant="subtitle1" component="div">
                                    {name}
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    {mode.capitalizeFirstCharacter()}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="body2">
                                    <Grid container >
                                        <Grid item xs = {2} >
                                            <Tooltip title="Add To Cart">
                                                <IconButton color="primary" aria-label="add to shopping cart"
                                                className="icon-color" onClick={() => handleCart(image, mode, name, price, productId)}>
                                                    <AddShoppingCartIcon/>
                                                </IconButton>
                                            </Tooltip>
                                        </Grid>
                                        <Grid item xs = {10}>
                                            <Tooltip title="Remove Product">
                                                <IconButton style={{cursor: 'pointer'}} onClick = {() => handleRemove(_id, email)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </Grid>
                                    </Grid>
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
            <Row>
                <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                style={{width: 'auto'}}
                className = "snack-alert"
                >
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        Added To Cart.
                    </Alert>
                </Snackbar>
            </Row>
        </ThemeProvider>
    );
}

const mapDispatchToProps = dispatch => ({
    addItem : item => dispatch(addItem(item)),
    removeWishlistStart: (id) => dispatch(removeWishlistStart(id))
});

export default connect(null, mapDispatchToProps)(WishlistItemComponent);