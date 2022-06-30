import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';

import DiscountListComponent from './discount-list.component';
import WithSpinner from '../with-spinner/with-spinner.component';
import {selectIsFetchingDiscount} from '../../redux/discount/discount.selector';

const mapStateToProps = createStructuredSelector({
    isLoading: selectIsFetchingDiscount
});

const DiscountListContainer = compose(
    connect(mapStateToProps), WithSpinner
)(DiscountListComponent);

export default DiscountListContainer;