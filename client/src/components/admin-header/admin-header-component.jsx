import React, {useState, useEffect} from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from "react-router-dom";

import SvgWD from "../svg/svg.component";
import {adminSignOutStart} from '../../redux/admin/admin.action';


import './admin-header.styles.scss';

const AdminHeader = ({adminSignOutStart, history}) => {
    const [childLink, setChildLink] = useState('fa fa-bars bar link');
    const [path, setPath] = useState('');
    useEffect(() => {
        const toggle = document.querySelector('.toggle');
        const menu = document.querySelector('.menu');
        function toggleMenu() {
            if(menu.classList.contains("active")){
                menu.classList.remove("active");
                setChildLink('fa fa-bars bar link');
            }
            else{
                menu.classList.add("active");
                setChildLink('fa fa-times bar link');
            }
        }
        toggle.addEventListener('click', toggleMenu, false);
    },[]);

    const signOutAdmin = (event) => {
        event.preventDefault();
        adminSignOutStart(history);
        setChildLink('fa fa-bars bar link');
    }
    useEffect(() => {
        var newPath = window.location.pathname;
        setPath(newPath);
        const toggle = document.querySelector('.toggle');
        const signOut = document.querySelector('.signOut');
        const title = document.querySelector('.title');
        const product = document.querySelector('.product');
        const merchandise = document.querySelector('.merchandise');
        const banner = document.querySelector('.banner');
        const menu = document.querySelector('.menu');
        const discount = document.querySelector('.discount');
        const dashboard = document.querySelector('.dashboard');


        if(newPath === "/admin"){
            toggle.classList.add('hidden');
            signOut.classList.add('hidden');
            product.classList.add('hidden');
            title.classList.add('hidden');
            banner.classList.add('hidden');
            merchandise.classList.add('hidden');
            discount.classList.add('hidden');
            dashboard.classList.add('hidden');
            menu.classList.remove("active");

        }
        else{
            toggle.classList.remove('hidden');
            signOut.classList.remove('hidden');
            product.classList.remove('hidden');
            title.classList.remove('hidden');
            merchandise.classList.remove('hidden');
            discount.classList.remove('hidden');
            banner.classList.remove('hidden');
            dashboard.classList.remove('hidden');
        }
    });
    return (
    <nav className="header-menu">
        <ul className="menu">
            <li className="logo"><Link to="/"><SvgWD height={80} width={80}/></Link></li>
            
            <li className="item dashboard hidden"><Link className="link" to='/admin/dashboard'>Dashboard</Link></li>
            <li className="item title hidden"><Link className="link" to='/admin/title'>Title</Link></li>
            <li className="item product hidden"><Link className="link" to="/admin/product">Product</Link></li>
            <li className="item merchandise hidden"><Link className="link" to="/admin/merchandise">merchandise</Link></li>
            <li className="item banner hidden"><Link className="link" to='/admin/banner'>Banner</Link></li>
            <li className="item discount hidden"><Link className="link" to='/admin/discount'>Discount</Link></li>
            <li className="item signOut hidden link" style={{cursor: 'pointer'}} onClick={signOutAdmin}>Sign Out</li>
            
            <li className="toggle hidden"><a href="#">{React.createElement('i', {className: childLink})}</a></li>
        </ul>
    </nav>
)};
const mapDispatchToProps = dispatch => ({
    adminSignOutStart: (history) => dispatch(adminSignOutStart({history}))
})
export default withRouter(connect(null, mapDispatchToProps)(AdminHeader));