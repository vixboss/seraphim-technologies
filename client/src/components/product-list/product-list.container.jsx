import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';

import ProductList from './product-list.component';
import WithSpinner from '../with-spinner/with-spinner.component';
import {selectIsCollectionsFetching} from '../../redux/shop/shop.selector';

const mapStateToProps = createStructuredSelector({
    isLoading: selectIsCollectionsFetching
});

const ProductListContainer = compose(
    connect(mapStateToProps), WithSpinner
)(ProductList);

export default ProductListContainer;