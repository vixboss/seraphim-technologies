import React, {useState, useEffect}from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// import AdminTitleContainer from '../../components/admin-title/admin-title.container';
import AdminProduct from '../../components/admin-product/admin-product.component';
import {adminSignOutStart} from '../../redux/admin/admin.action';
import { getAllProductTitleStart } from './../../redux/product/product.action';

import './admin-panel.styles.scss';

const AdminPanelPage = ({adminSignOutStart, history, getAllProductTitleStart}) => {
    const [style, setStyle] = useState("no-width");
    const [rightPanelStyle, setRightPanleStyle] = useState('no-left-margin');
    const [tab, setTab] = useState('title');

    const openNav = () => {
        setStyle('add-width');
        setRightPanleStyle('add-left-margin');
    }
    const closeNav = () => {
        setStyle('no-width');
        setRightPanleStyle('no-left-margin');
    }
    
    const switchPage = (value) => {
        setTab(value);
    }

    const signOutAdmin = (event) => {
        event.preventDefault();
        adminSignOutStart(history);
    }

    // useEffect(() => {
    //     getAllProductTitleStart();
    // }, [getAllProductTitleStart]);

    return(
        <div className='admin-panel-page'>
            <div id="mySidenav" className={`sidenav ${style}`}>
                <span className="closebtn" onClick={closeNav}>&times;</span>
                <span className="title" onClick={() => switchPage('title')}>Title</span>
                <span className="product" onClick={() => switchPage('product')}>Product</span>
                <span className='sign-out' onClick={signOutAdmin}>Sign Out</span>
            </div>
            <span className="side-nav-span" onClick={openNav}>&#9776;</span>

            <div className={`right-panel ${rightPanelStyle}`}>
            {/* {
                (() => {
                    switch (tab) {
                    case 'title':
                        return <AdminTitleContainer/>
                    case 'product':
                        return <AdminProduct/>
                    default:
                        return null
                    }
                })
                ()
            } */}
            </div>
        
        </div>
    );
}

const mapDispatchToProps = dispatch => ({
    adminSignOutStart: (history) => dispatch(adminSignOutStart({history})),
    getAllProductTitleStart: () => dispatch(getAllProductTitleStart())
})
export default withRouter(connect(null, mapDispatchToProps)(AdminPanelPage));