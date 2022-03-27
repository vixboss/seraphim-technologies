import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import { selectIsProductTypeFetching } from "../../redux/product/product.selector";
import WithSpinner from "../with-spinner/with-spinner.component";
import ProductTitleList from './product-title-list.component';

const mapStateToProps = createStructuredSelector({
    isLoading: selectIsProductTypeFetching
});

const ProductTitleListContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(ProductTitleList);

export default ProductTitleListContainer;