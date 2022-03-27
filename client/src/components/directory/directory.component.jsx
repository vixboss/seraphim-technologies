import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CrouselImage from '../crousel-image/crousel-image.component';
import DirectoryMenu from '../directory-menu/directory-menu.component';
import BannerComponent from '../banner/banner.component';
// import MenuItem from '../menu-item/menu-item.component';
import { selectDirectorySections } from '../../redux/directory/directory.selector';

import './directory.styles.scss';

const Directory  = ({sections}) => (
    
        // <div className='directory-menu'>
        //     {
        //         sections.map(({id, ...otherSectionProps}) => {
        //             return <MenuItem key={id} {...otherSectionProps}/>
        //         })
        //     }
        // </div>

        <div className='menu-directory'>
            <CrouselImage/>
            <DirectoryMenu/>
            <BannerComponent/>
        </div>
);

const mapStateToProps = createStructuredSelector({
    sections: selectDirectorySections
})

export default connect(mapStateToProps)(Directory);