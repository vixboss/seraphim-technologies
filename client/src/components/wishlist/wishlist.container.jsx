import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import { isFetchingWishlist } from "../../redux/wishlist/wishlist.selector";
import WithSpinner from "../with-spinner/with-spinner.component";
import WishlistComponent from './wishlist.component';

const mapStateToProps = createStructuredSelector({
    isLoading: isFetchingWishlist
});

const WishlistContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(WishlistComponent);

export default WishlistContainer;