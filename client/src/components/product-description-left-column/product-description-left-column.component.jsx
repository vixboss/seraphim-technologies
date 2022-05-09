import React, {useState} from 'react';
import { connect } from 'react-redux';
import Checkbox from '@mui/material/Checkbox';
import { Row, Col } from 'react-bootstrap';
import IconButton from '@mui/material/IconButton';
import AlarmIcon from '@mui/icons-material/Alarm';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import { styled } from '@mui/material/styles';
import MuiGrid from "@mui/material/Grid";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


import { addItem } from '../../redux/cart/cart.action';

import './product-description-left-column.styles.scss';
// import { AddButton } from './product-description-left-column.styles';
// import { previousSaturday } from 'date-fns/esm';


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const ProductDescriptionLeftColumn = ({id, item, addItem, name}) => {
    const Root = styled('div')(({ theme }) => ({
        width: '100%',
        ...theme.typography.body2,
        '& > :not(style) + :not(style)': {
            marginTop: theme.spacing(8),
        },
    }));

    const Grid = styled(MuiGrid)(({ theme }) => ({
        width: "100%",
        ...theme.typography.body2,
        '& [role="separator"]': {
          margin: theme.spacing(0, 3)
        }
      }));
    
    const { imageUrl, price , merchandise} = item;
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    const cost = merchandise;
    const [accumulatedPrice, setAccumulatedPrice] = useState(0);
    const [itemList, setItemList] = useState([]);
    const onCheck = (event, amount, modeName, image) => {
        const isChecked = event.target.checked;
        const mode = modeName.capitalizeFirstCharacter();
        const newAmount = parseInt(amount);
        if(isChecked){
            setAccumulatedPrice(accumulatedPrice + newAmount);
            setItemList([...itemList, {
                'price': newAmount,
                'mode': mode,
                'imageUrl': image,
                'name': name,
                'quantity': 1
            }]);
        }
        else{
            setAccumulatedPrice(accumulatedPrice > newAmount ? accumulatedPrice - newAmount : 0);
            setItemList(itemList.filter(item => item.mode !== mode));
        }
    };

    const handleCartItem = () => {
        if(itemList.length !== 0){
            addItem(itemList);
            handleClick();
        }
    }
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        setOpen(false);
    };
    return (
        <>
            <Row>
                <img id={id} data-image="red" className="active product-description-image" src={imageUrl} alt=""/>
            </Row>
            <Row className="border-align">
               {/* <Col>
                    <span className="price">${price}</span>
                </Col>
                <Col className="add-button">
                    <AddButton onClick={() => addItem(item)} inverted>
                        Add to cart
                    </AddButton>
               </Col> */}
                    {
                        cost && cost.map((productPrice, index) => {
                            if(productPrice.price !== ''){
                                return (
                                    <Row className="align" key={index}>
                                        <Col sm = {8} xs = {6}>
                                            <span>{productPrice.name.capitalizeFirstCharacter()}</span>
                                        </Col>
                                        <Col sm = {2} xs = {4}>
                                            <span>${productPrice.price}</span>
                                        </Col>
                                        <Col sm = {2} xs = {2}>
                                            <Checkbox className='icon-color' {...label} onClick ={(event) => onCheck(event, productPrice.price, productPrice.name, imageUrl)}/>
                                        </Col>
                                    </Row>
                                );
                            }
                        })
                    }
                    {

                        accumulatedPrice > 0 
                        && 
                        <Row className="align">
                            <Root>
                                <Divider>
                                    <Chip label="PRICE" />
                                </Divider>
                            </Root>
                            <Col xs = {6} sm = {6} className="align">
                                <span>Total :</span>
                            </Col>
                            <Col xs = {6} sm = {6} className="align-price">
                                <span>${accumulatedPrice}</span>
                            </Col>
                        </Row>
                    }
                    {

                        accumulatedPrice > 0 && <Row className="align">
                            <Grid container className="align-center">
                                <Grid item xs>
                                    <Tooltip title = "Add To Wishlist">
                                        <IconButton style = {{color: '#43484D'}} aria-label="add an alarm">
                                            <AlarmIcon />
                                        </IconButton>
                                    </Tooltip>
                                </Grid>
                                <Divider orientation="vertical" flexItem>
                                    OR
                                </Divider>
                                <Grid item xs>
                                    <Tooltip title="Add To Cart">
                                        <IconButton color="primary" aria-label="add to shopping cart" onClick = {handleCartItem} className="icon-color">
                                            <AddShoppingCartIcon/>
                                        </IconButton>
                                    </Tooltip>
                                </Grid>
                                
                            </Grid>
                        </Row>
                    }
            </Row>
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
        </>

    )
}

const mapDispatchtoProps = dispatch => ({
    addItem : item => dispatch(addItem(item))
});

export default connect(null, mapDispatchtoProps)(ProductDescriptionLeftColumn);