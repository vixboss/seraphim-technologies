import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Container } from 'react-bootstrap';

import AdminUserPurchaseListContainer from '../admin-user-purchase-list/admin-user-purchase-list.container';
import { getAllUserPurchaseStart } from '../../redux/user-purchase/user-purchase.action';
import { selectUserAllPurchase } from '../../redux/user-purchase/user-purchase.selector';

import './admin-dashboard.styles.scss';

const AdminDashboard = ({getAllUserPurchaseStart, userPurchase}) => {
    const data = typeof userPurchase !== "undefined" ? userPurchase : '';
    useEffect(() => {
        getAllUserPurchaseStart();
    },[]);

    return(
        <Container>
            <AdminUserPurchaseListContainer data = {data}/>
        </Container>

    );
}

const mapStateToProps = createStructuredSelector({
    userPurchase: selectUserAllPurchase
});

const mapDispatchToProps = (dispatch) => ({
    getAllUserPurchaseStart: () => dispatch(getAllUserPurchaseStart())
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboard);