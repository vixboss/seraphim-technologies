import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';

import SubscriptionListComponent from './subscription-list.component';
import WithSpinner from '../with-spinner/with-spinner.component';
import {isFetchingSubscription} from '../../redux/subscription/subscription.selector';

const mapStateToProps = createStructuredSelector({
    isLoading: isFetchingSubscription
});

const SubscriptionListContainer = compose(
    connect(mapStateToProps), WithSpinner
)(SubscriptionListComponent);

export default SubscriptionListContainer;