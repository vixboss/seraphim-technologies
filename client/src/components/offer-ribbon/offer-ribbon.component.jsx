import React from 'react';

import './offer-ribbon.styles.scss';

const OfferRibbonComponent = () => {

    return(
        <>
            <p className="ribbon">
                <span className="text">
                    <strong className="bold" style={{color: '#44107a'}}>Special Offer: </strong>
                    <span className='animate-charcter'>
                        Get $30, $100 & $200 OFF on each Webinar*
                    </span>
                </span>
            </p>
        </>
    );
}

export default OfferRibbonComponent;