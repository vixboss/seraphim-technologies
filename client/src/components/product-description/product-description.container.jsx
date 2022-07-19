import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import { selectIsProductTypeFetching } from '../../redux/product/product.selector';
import WithSpinner from "../with-spinner/with-spinner.component";
import ProductDescription from "./product-description.component";

const mapStateToProps = createStructuredSelector({
    isLoading: selectIsProductTypeFetching
});

const ProductDescriptionContainer= compose(
    connect(mapStateToProps),
    WithSpinner
)(ProductDescription);

export default ProductDescriptionContainer;