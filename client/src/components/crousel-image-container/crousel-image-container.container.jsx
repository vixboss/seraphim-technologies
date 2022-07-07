import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import { selectIsBannerFetching } from "../../redux/banner/banner.selector";
import WithSpinner from "../with-spinner/with-spinner.component";
import CrouselImageContainerComponent from './crousel-image-container.component';

const mapStateToProps = createStructuredSelector({
    isLoading: selectIsBannerFetching
});

const CrouselImageContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(CrouselImageContainerComponent);

export default CrouselImageContainer;