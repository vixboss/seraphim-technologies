import React, { useEffect } from 'react';
import {connect} from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Container, Row } from 'react-bootstrap';

import SubscriptionListContainer from '../subscription-list/subscription-list.container';
import {selectAllSubscriptions} from '../../redux/subscription/subscription.selector';
import {getSubscriptionStart} from '../../redux/subscription/subscription.action';
import './admin-subscribe.styles.scss';

const AdminSubscribeComponent = ({getSubscriptionStart, allSubscriptions}) => {

    useEffect(() => {
        getSubscriptionStart();
    }, [getSubscriptionStart]);

    return (
        <Container>
            <Row>
                <SubscriptionListContainer allSubscriptions = {allSubscriptions}/>
            </Row>
        </Container>
    );
}

const mapDispatchToProps = dispatch => ({
    getSubscriptionStart: () => dispatch(getSubscriptionStart())
});

const mapStateToProps = createStructuredSelector({
    allSubscriptions: selectAllSubscriptions
});
export default connect(mapStateToProps, mapDispatchToProps)(AdminSubscribeComponent);