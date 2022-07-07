import react, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import CrouselImageContainer from './../crousel-image-container/crousel-image-container.container';
import { 
    getAllBannerStart 
} from './../../redux/banner/banner.action';
import { selectBannerType } from '../../redux/banner/banner.selector';

import './crousel-image.styles.scss';

const CrouselImage = ({bannerType, getAllBannerStart}) => {
    useEffect(() => {
        getAllBannerStart();
    }, []);

    return(
        <CrouselImageContainer bannerType={bannerType.slice(0,5)}/>
    );
}
const mapDispatchToProps = dispatch => ({
    getAllBannerStart: () => dispatch(getAllBannerStart())
});
const mapStateToProps = createStructuredSelector({
    bannerType: selectBannerType
});

export default connect(mapStateToProps, mapDispatchToProps)(CrouselImage);