import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import { selectIsBannerFetching } from "../../redux/banner/banner.selector";
import WithSpinner from "../with-spinner/with-spinner.component";
import BannerTitleList from './banner-title-list.component';

const mapStateToProps = createStructuredSelector({
    isLoading: selectIsBannerFetching
});

const BannerTitleListContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(BannerTitleList);

export default BannerTitleListContainer;