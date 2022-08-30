import React from 'react';
import { withRouter } from 'react-router-dom';
import {Container, Row} from 'react-bootstrap';
import Button from '@mui/material/Button';

import WishlistItemComponent from '../wishlist-item/wishlist-item.component';
import './wishlist.styles.scss';

const WishlistComponent = ({selectAllWishlists, history}) => {
    if(typeof selectAllWishlists !== 'string' && selectAllWishlists.length === 0){
        selectAllWishlists = "Please login to see wishlist..."
    }
    return(
        <Container style = { typeof selectAllWishlists === 'string' ? {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '300px'
        }: 
        null
        }>
            {
                
                typeof selectAllWishlists !== 'string' && selectAllWishlists.length > 0 &&
                    <Row md = {8} xs = {8}>
                        <div className="goto-cart-button">
                            <span className="goto-cart-button-span">
                                <Button 
                                    className="goto-cart-shopping-button"
                                    variant="contained" 
                                    onClick={() => history.push('/checkout')}
                                >
                                    Go to cart &nbsp; 
                                    <i className="fa fa-arrow-right" aria-hidden="true"></i>
                                </Button>
                            </span>
                        </div>
                    </Row>
            }

            {
                typeof selectAllWishlists !== 'string' && selectAllWishlists.length > 0 ?
                selectAllWishlists.map((wishlist) => {
                    return <WishlistItemComponent wishlist = {wishlist} key = {wishlist._id}/>
                })
                : 
                <Row>
                    <h1 className = "animate-charcter">{selectAllWishlists}</h1>
                </Row>
            }
        </Container>
    )
}

export default withRouter(WishlistComponent);