import React from 'react';
import {withRouter} from 'react-router-dom';

import SubscribeComponent from '../../components/subscribe/subscribe.component';
import UnsubscribeComponent from '../../components/unsubscribe/unsubscribe.component';
import './subscribepage.styles.scss';

const SubscribePage = ({location, match}) => {
    console.log(match.path);
    return(
        <>
            {

                match.path === '/subscribe' ? <SubscribeComponent/> : <UnsubscribeComponent/>
            }
        </>
    )
}

export default withRouter(SubscribePage);