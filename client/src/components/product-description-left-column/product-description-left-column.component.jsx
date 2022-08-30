import React, {useState} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
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
import jsPDF from 'jspdf';
import {createStructuredSelector} from 'reselect';

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import WD from './../../assets/wdNew.jpg';
import { addItem } from '../../redux/cart/cart.action';
import {addWishlistStart} from '../../redux/wishlist/wishlist.action';
import { selectCurrentUser }  from '../../redux/user/user.selector';

import './product-description-left-column.styles.scss';
import { useEffect } from 'react';
// import { AddButton } from './product-description-left-column.styles';
// import { previousSaturday } from 'date-fns/esm';

const MySwal = withReactContent(Swal);

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const ProductDescriptionLeftColumn = ({id, item, addItem, name, date, history, addWishlistStart, currentUser, days}) => {
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
                'id': item._id,
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
        }
    }
    const handleWishlist = () => {
        if(itemList.length !== 0){
            if(currentUser !== null){
                addWishlistStart({itemList, email: currentUser.email});
                handleClick();
            }
            else{
                MySwal.fire({
                    position: 'top-end',
                    icon: 'warning',
                    title: 'Please sign in to add products in wishlist.',
                    showConfirmButton: false,
                    timer: 3000
                });
            }
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

    const handleFormDownload = (event) => {

        /********************************************************/
        /********************************************************/
        /****************CODE FOR PDF GENERATION*****************/
        /********************************************************/
        /********************************************************/

        const doc = new jsPDF('portrait', 'px', 'a4', 'false');
        doc.addImage(WD, 'PNG', 20, 0, 50, 50);
        
        // Setting Header of PDF
        doc.setFont("Helvetica");
        doc.setFontSize(18);
        doc.text('Customer/Payment Detail Form', 225, 30, 'center');
        doc.setFontSize(12);

        // Setting Tables in PDF
        var startingPage = doc.internal.getCurrentPageInfo().pageNumber;
        doc.autoTable({
            head: [['Payment Information']],
            body: [
                ["Credit Card #: _______________________________"],
                ["Expiration Date: ____/ ____/ (mm/YY)"],
                ["Cardholder's Name: __________________________"],
                ["CVV or CVC: __________________________________________"],
                ["Signature : __________________________________________"],
                ["Billing Email : __________________________________________"],
                ["Tick the mode:"],
                ["[  ] Visa   [  ] Master Card   [  ] Discover"],
                ["[  ] American Express"],
                ["[  ] Others (Type Here): _______________________"]
            ],
            margin:{
                top:50,
                right: 230
            },
            headStyles:{
                valign: 'middle',
                halign : 'center'
            },
            avoidPageSplit: true
        });

        doc.setPage(startingPage);

        doc.autoTable({
            head: [['Personal Information']],
            body: [
                ["Name: _____________________________________"],
                ["Address: ___________________________________________"],
                ["Address Line 2: ___________________________________________"],
                ["City: _______________________________________"],
                ["State : _____________________________________"],
                ["Zip : _______________________________________"],
                ["Phone: _____________________________________"],
                ["Fax: _______________________________________"],
                ["Email: _____________________________________"],
            ],
            margin:{
                // top:40,
                left: 230
            },
            headStyles:{
                valign: 'middle',
                halign : 'center'
            },
            startY: 50,
            
        });

        // Setting Payment Option Line:
        doc.setLineWidth(1.0);
        doc.text('If you want to make the payment through check or ACH please E-mail us at: cs@webinardock.com', 30, 290, 'left').setFont(undefined, 'bold').line(335, 292, 425, 292);
        
        // Setting Second Heading in PDF.
        doc.setFontSize(18);
        doc.text('Product Order Form', 225, 320, 'center');
        doc.setFontSize(12);

        // Setting Conference Name and Date in PDF.
        // doc.text('Conference Title: ', 30, 350, 'left').setFont(undefined, 'normal');
        // doc.text(name, 120, 350).setFont(undefined, 'bold');

        // doc.text('Conference Date: ', 30, 360, 'left').setFont(undefined, 'normal');
        // doc.text(date.convertToDate().split(' ').splice(1).join(' '), 120, 360).setFont(undefined, 'bold');

        // Setting Dynamic Table in PDF for Quantity.
        var productArray = [];
        if(typeof cost !== "undefined"){
            cost.map((prdArray) => {
                if(prdArray.price !== '' && prdArray.price !== null){
                    var filterArray = [];
                    filterArray.push(prdArray.name);
                    filterArray.push('________');
                    filterArray.push("$" + prdArray.price);
                    filterArray.push('________');
                    productArray.push(filterArray);
                }
            });

            productArray.push(['', '', 'Coupon Code', '________']);
            productArray.push(['', '', 'Total', '________']);
        }

        // Setting Auto tables.
        doc.autoTable({
            body:[
                ['Conference Title:', name],
                ['Conference Date:', date.convertToDate().split(' ').splice(1).join(' ')]
            ],
            theme: 'plain',
            startY: 330,
            styles: { 
                fontSize: 11 
            },
            columnStyles: {
                0: {
                    cellWidth: 80,
                    fontStyle: 'bold'
                },
                1: {
                    halign: 'left'
                }
              }
        });

        doc.autoTable({
            head: [['Product', 'Quantity', 'Price', 'Total']],
            body: productArray,
            startY: 400,

        });

        doc.text('Please send the completed order form via fax or e-mail',220, 620, 'center');
        doc.save('order_form.pdf');
        doc.autoPrint();
    }
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
                            if(productPrice.price !== '' && productPrice.price !== null && (typeof days !== "undefined" || !productPrice.name.toLowerCase().includes("live"))){
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
                                        <IconButton style = {{color: '#43484D'}} aria-label="add an alarm" onClick = {handleWishlist}>
                                            <AlarmIcon />
                                        </IconButton>
                                    </Tooltip>
                                </Grid>
                                <Divider orientation="vertical" flexItem>
                                    OR
                                </Divider>
                                <Grid item xs>
                                    <Tooltip title="Add To Cart">
                                        <IconButton color="primary" aria-label="add to shopping cart" onClick = {
                                            () => {

                                                handleCartItem(); 
                                                history.push('/checkout');
                                            }
                                        } className="icon-color">
                                            <AddShoppingCartIcon/>
                                        </IconButton>
                                    </Tooltip>
                                </Grid>
                                
                            </Grid>
                        </Row>
                    }
                    {
                        <Row className='align'>
                            <Col className="border-align-inside-box">
                                <ul style={{ listStyleType: 'none', paddingLeft: '10px' }}>
                                    <li>
                                        <span>*</span>
                                        For more than 6 attendee mail us at cs@webinardock.com
                                    </li>
                                    <li>
                                        <span>*</span>
                                        For cheque or ACH payment mail us at cs@webinardock.com
                                    </li>
                                    <li>
                                        <span>*</span>
                                        <Tooltip title="Click to download from">
                                            <span 
                                                style={{color: '#1aa5d8', cursor: 'pointer'}}
                                                onClick = {handleFormDownload}
                                            >Click </span> 
                                        </Tooltip>
                                        to download the Order Form.
                                    </li>
                                </ul>
                            </Col>
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
                        Added To Wishlist.
                    </Alert>
                </Snackbar>
            </Row>
        </>

    )
}

const mapDispatchtoProps = dispatch => ({
    addItem : item => dispatch(addItem(item)),
    addWishlistStart: (data) => dispatch(addWishlistStart(data))
});

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
})

export default withRouter(connect(mapStateToProps, mapDispatchtoProps)(ProductDescriptionLeftColumn));