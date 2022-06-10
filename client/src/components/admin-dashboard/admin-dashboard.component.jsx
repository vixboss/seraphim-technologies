import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Container } from 'react-bootstrap';

import AdminUserPurchaseListContainer from '../admin-user-purchase-list/admin-user-purchase-list.container';
import { getAllUserPurchaseStart } from '../../redux/user-purchase/user-purchase.action';
import { getAllUserPurchaseListStart } from './../../redux/user-purchase-list/user-purchase-list.action';
import { selectUserAllPurchaseList } from '../../redux/user-purchase-list/user-purchase-list.selector';

import './admin-dashboard.styles.scss';

const AdminDashboard = ({getAllUserPurchaseStart, getAllUserPurchaseListStart, userPurchaseList}) => {
    const data = typeof userPurchaseList !== "undefined" ? userPurchaseList.data : '';
    useEffect(() => {
        getAllUserPurchaseStart();
        getAllUserPurchaseListStart();
    },[]);

    return(
        <Container>
            <AdminUserPurchaseListContainer data = {data}/>
        </Container>

    );
}

const mapStateToProps = createStructuredSelector({
    userPurchaseList: selectUserAllPurchaseList
});

const mapDispatchToProps = (dispatch) => ({
    getAllUserPurchaseStart: () => dispatch(getAllUserPurchaseStart()),
    getAllUserPurchaseListStart : () => dispatch(getAllUserPurchaseListStart())
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboard);