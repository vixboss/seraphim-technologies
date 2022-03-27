import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import { selectIsCollectionsFetching } from "../../redux/shop/shop.selector";
import WithSpinner from "../with-spinner/with-spinner.component";
import MenuCard from './menu-card.component';

const mapStateToProps = createStructuredSelector({
    isLoading: selectIsCollectionsFetching
});

const MenuCardContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(MenuCard);

export default MenuCardContainer;