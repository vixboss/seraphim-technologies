import React, {useState, useEffect} from "react";
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {Row, Col} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import { styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import PaymentOptionComponent from "../../components/payment-option/payment-option.component";
import {srvTime, currentDateAndTimeInISTWithotFormat} from '../../factory';

import { discountGetByNameStart } from './../../redux/discount/discount.action';
import { selectAllDiscount } from './../../redux/discount/discount.selector';
import { selectCartItems, selectCartTotal } from './../../redux/cart/cart.selector';
import { selectCurrentUser }  from '../../redux/user/user.selector';

import './checkout.styles.scss';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const CheckoutPage = ({cartItems, total, history, currentUser, discountGetByNameStart, discount}) => {
    const Root = styled('div')(({ theme }) => ({
        width: '100%',
        ...theme.typography.body2,
        '& > :not(style) + :not(style)': {
            marginTop: theme.spacing(8),
        },
    }));
    
    const cloneDiscount = discount;
    var [newTotal, setNewTotal] = useState(total);

    const [open, setOpen] = useState(false);
    const [couponCode, setCouponCode] = useState('');

    const [coupon, setCoupon] = useState({
        discount: '',
        total: total,
        value: 0,
        appliedCoupon: '',
        snack: '',
        calculatedValue: 0
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        const {value} = event.target;
        setCouponCode(value);
    }

    const applyCoupon = () => {
        discountGetByNameStart(couponCode);
    }

    const discountCalculation = () => {
        if(cloneDiscount.discount !== null && cloneDiscount.discount !== "No Record(s) Found.") {
            const newDiscount = cloneDiscount.discount;
            const newValue = newDiscount[0].value;
            const type = newDiscount[0].type;
            const category = newDiscount[0].category;

            var currentServerDateAndTime = srvTime();
            var comparedDateObject = currentDateAndTimeInISTWithotFormat(newDiscount[0].createdAt, newDiscount[0].validity, currentServerDateAndTime);

            // Method to calculate the Discount in Dollar.
            const calculateDiscountInDollar = () => {
                const discountedTotal = total ? (parseInt(total) - parseInt(newValue)) : coupon.total;
                setCoupon({...coupon, total: discountedTotal, appliedCoupon: newDiscount[0].name, value: newDiscount[0].value, snack: 'active', calculatedValue: newValue});
                handleSnackClick();
            };

            if(comparedDateObject.status === "Active") {
                if(type === "$") {
                    if(category === 'special'){
                        if(parseInt(newValue) <= 100){
                            if(parseInt(total) >= 500){
                                calculateDiscountInDollar();
                            }
                            else{
                                setCoupon({
                                    discount: '',
                                    total: total,
                                    value: 0,
                                    appliedCoupon: '',
                                    snack:'notApplicable',
                                    calculatedValue: 0
                                });
                                cloneDiscount.discount = null;
                                handleSnackClick();
                            }
                        }
                        else if(parseInt(newValue) <= 200){
                            if(parseInt(total) >= 1000){
                                calculateDiscountInDollar();
                            }
                            else{
                                setCoupon({
                                    discount: '',
                                    total: total,
                                    value: 0,
                                    appliedCoupon: '',
                                    snack:'notApplicable',
                                    calculatedValue: 0
                                });
                                cloneDiscount.discount = null;
                                handleSnackClick();
                            }
                        }
                    }
                    else{
                        calculateDiscountInDollar();
                    }
                }
                else{

                    const valueInPercentage = (parseInt(total).toFixed(2) * (parseInt(newValue).toFixed(2)/100));

                    const discountedPercentageTotal = total ? (total - valueInPercentage) : coupon.total;

                    setCoupon({...coupon, total: discountedPercentageTotal, appliedCoupon: newDiscount[0].name, value: newDiscount[0].value, snack: 'active', calculatedValue: valueInPercentage});
                    handleSnackClick();
                }
            }
            else{

                setCoupon({
                    discount: '',
                    total: total,
                    value: 0,
                    appliedCoupon: '',
                    snack:'expired',
                    calculatedValue: 0
                });
                cloneDiscount.discount = null;
                handleSnackClick();
            }
        }else{
            if(cloneDiscount.discount !== null){
                setCoupon({
                    discount: '',
                    total: total,
                    value: 0,
                    appliedCoupon: '',
                    snack:'notFound',
                    calculatedValue: 0
                });
                handleSnackClick();
                cloneDiscount.discount = null;

            }
            else{
                setCoupon({...coupon, total: total});
            }
        }
    }

    useEffect(() => {
        setNewTotal(total);
    }, [total]);
    
    useEffect(() => {
        discountCalculation();
    },[discount, newTotal]);

    const handleRemoveCouponCode = () => {
        setCoupon({
            discount: '',
            total: total,
            value: 0,
            appliedCoupon: '',
            snack: '',
            calculatedValue: 0
        });
        cloneDiscount.discount = null;
    }

    const [snackOpen, setSnackOpen] = React.useState(false);

    const handleSnackClick = () => {
        setSnackOpen(true);
    };

    const handleSnackClose = (reason) => {
        if (reason === 'clickaway') return;
        setSnackOpen(false);
    };

    return (
    <Row className="page-border set-margin">
        <div className="continue-button">
            <span className="continue-button-span">
                <Button 
                    className="continue-shopping-button"
                    variant="contained" 
                    onClick={() => history.push('/shop')}
                >
                    <i className="fa fa-arrow-left" aria-hidden="true"></i>
                    &nbsp; Continue Shopping
                </Button>
            </span>
        </div>
        {
            cartItems.map((cartItem, index) =>(
                <CheckoutItem key={index} cartItem={cartItem}/>
            ))
        }
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
            <Row style={{fontWeight: '600', fontSize: 'larger'}}>
                <Col md={6} xs={6} xm={6} style={{color: 'grey'}}>
                    <span>Sub Total</span>
                </Col>
                <Col md={6} xs={6} xm={6} align="right" style={{letterSpacing: '2px'}}>
                    <span>${total.toFixed(2)}</span>
                </Col>
            </Row>
            <Row style={{fontWeight: '600', fontSize: 'larger'}}>
                <Col md={6} xs={6} xm={6} style={{color: 'grey'}}>
                    <span>Discount {
                        cloneDiscount.discount !== null && cloneDiscount.discount !== "No Record(s) Found." ? 
                        (cloneDiscount.discount[0].type === "$" ? '- ($' + coupon.value + ')': '- (' + coupon.value + '%)') : ''
                    }</span>
                </Col>
                <Col md={6} xs={6} xm={6} align="right" style={{letterSpacing: '2px', color: '#fc5185'}}>
                    <span> - ${coupon.calculatedValue.toFixed(2)}</span>
                </Col>
            </Row>
            <Root>
                <Divider>
                    <Chip label="TOTAL" />
                </Divider>
            </Root>
            <Row>
                <Col md={6} xs={6} xm={6} style={{fontWeight: '600', fontSize: 'x-large'}}>
                    <span>Total</span>
                </Col>
                <Col md={6} xs={6} xm={6} align="right" style={{letterSpacing: '2px', fontWeight: '600', fontSize: 'x-large', color: '#2f1c6a'}}>
                    <span>${coupon.total.toFixed(2)}</span>
                </Col>
            </Row>
            <Row>
                {
                    coupon.appliedCoupon === '' ?
                    <Col md={6} xs={8} xm={8} style={{fontWeight: '600', fontSize: 'x-large'}}>
                        <span onClick={handleClickOpen} className = "coupon">Have a coupon code?</span>
                    </Col>
                    :
                    <Col md={6} xs={12} xm={12} style={{fontWeight: '600', fontSize: 'larger'}}>
                        <span onClick={handleClickOpen}>Coupon code &nbsp;</span>
                        <span
                            style={{
                                color: 'white',
                                backgroundColor: '#fc5185',
                                borderRadius: '5px',
                                paddingLeft: '10px',
                                paddingRight: '10px'
                            }}
                        >{coupon.appliedCoupon}</span>
                        <span>
                            <Tooltip title="Remove Applied Coupon">
                                <IconButton color="primary" aria-label="add to shopping cart" onClick = {
                                    () => {
                                        handleRemoveCouponCode()
                                    }
                                } className="icon-color">
                                    <DeleteIcon/>
                                </IconButton>
                            </Tooltip>
                        </span>
                    </Col>
                }
            </Row>
            <Row>
                {
                    coupon.snack === 'active' &&
                    <Snackbar
                        open={snackOpen}
                        autoHideDuration={5000}
                        onClose={handleSnackClose}
                        style={{width: 'auto'}}
                        className = "snack-alert"
                    >
                        <Alert onClose={handleSnackClose} severity="success" sx={{ width: '100%' }}>
                            Coupon Applied.
                        </Alert>
                    </Snackbar> 
                }
            </Row>
            <Row>
                {
                    coupon.snack === 'notFound' &&
                    <Snackbar
                        open={snackOpen}
                        autoHideDuration={5000}
                        onClose={handleSnackClose}
                        style={{width: 'auto'}}
                        className = "snack-alert"
                    >
                        <Alert onClose={handleSnackClose} severity="warning" sx={{ width: '100%' }}>
                            Coupon not found.
                        </Alert>
                    </Snackbar> 
                }
            </Row>
            <Row>
                {
                    coupon.snack === 'expired' &&
                    <Snackbar
                        open={snackOpen}
                        autoHideDuration={5000}
                        onClose={handleSnackClose}
                        style={{width: 'auto'}}
                        className = "snack-alert"
                    >
                        <Alert onClose={handleSnackClose} severity="error" sx={{ width: '100%' }}>
                            Coupon has expired.
                        </Alert>
                    </Snackbar> 
                }
            </Row>
            <Row>
                {
                    coupon.snack === 'notApplicable' &&
                    <Snackbar
                        open={snackOpen}
                        autoHideDuration={5000}
                        onClose={handleSnackClose}
                        style={{width: 'auto'}}
                        className = "snack-alert"
                    >
                        <Alert onClose={handleSnackClose} severity="error" sx={{ width: '100%' }}>
                            Coupon is not applicable.
                        </Alert>
                    </Snackbar> 
                }
            </Row>
        </Paper>
        
        <Row className="test-warning">
            *Please use the follwoing test credit card for the payments*
            <br/>
            4242 4242 4242 4242 - Exp: 01/24 -CVV: 123
        </Row>
        <div className="pay-button">
            <span className="pay-button-span">
            {
                currentUser !== null ?  <PaymentOptionComponent discountPrice={coupon.calculatedValue.toFixed(2)} cartItems = {cartItems}/> :
                <Button variant="contained" onClick={() => history.push('/signin')}>
                    Sign In for payment.
                </Button>
            }
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
                name="couponCode"
                value={couponCode}
                onChange = {handleChange}
            />
            </DialogContent>
            <DialogActions>
                <Button style={{color: '#6c757d'}} onClick={handleClose}>Cancel</Button>
                <Button style={{color: '#6c757d'}} onClick={() => {handleClose(); applyCoupon();}}>Apply</Button>
            </DialogActions>
        </Dialog>
    </Row>

)}

const mapDispatchToProps = dispatch => ({
    discountGetByNameStart: (name) => dispatch(discountGetByNameStart(name))
});

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    total: selectCartTotal,
    discount: selectAllDiscount,
    currentUser: selectCurrentUser

})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CheckoutPage));