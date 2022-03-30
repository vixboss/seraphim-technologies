import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';

import MerchandiseListComponent from './merchandise-list.component';
import WithSpinner from '../with-spinner/with-spinner.component';
import {isMerchandiseFetching} from '../../redux/merchandise/merchandise.selector';

const mapStateToProps = createStructuredSelector({
    isLoading: isMerchandiseFetching
});

const MerchandiseListContainer = compose(
    connect(mapStateToProps), WithSpinner
)(MerchandiseListComponent);

export default MerchandiseListContainer;