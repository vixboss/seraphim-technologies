import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {getWishlistStart} from '../../redux/wishlist/wishlist.action';

import { selectCurrentUser }  from '../../redux/user/user.selector';
import { selectAllWishlists } from '../../redux/wishlist/wishlist.selector';
import WishlistContainer from '../../components/wishlist/wishlist.container';
const WishlistPage = ({getWishlistStart, currentUser, selectAllWishlists}) => {
    useEffect(() => {
        if(currentUser !== null)
            getWishlistStart(currentUser.email);
    }, [getWishlistStart, currentUser]);

    return(
        <>
            <WishlistContainer selectAllWishlists = {selectAllWishlists}/>
        </>
    );
}

const mapDispatchToProps = dispatch => ({
    getWishlistStart: (data) => dispatch(getWishlistStart(data))
});

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    selectAllWishlists: selectAllWishlists
});

export default connect(mapStateToProps, mapDispatchToProps)(WishlistPage);