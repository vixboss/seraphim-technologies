import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import { selectIsCollectionsItemDetailFetching } from "../../redux/shop/shop.selector";
import WithSpinner from "../../components/with-spinner/with-spinner.component";
import ProductDescription from "./product-description.component";

const mapStateToProps = createStructuredSelector({
    isLoading: selectIsCollectionsItemDetailFetching
});

const ProductDescriptionContainer= compose(
    connect(mapStateToProps),
    WithSpinner
)(ProductDescription);

export default ProductDescriptionContainer;