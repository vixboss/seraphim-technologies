import React, {useState, useEffect} from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from "react-router-dom";
import {MdOutlineArrowDropDown, MdOutlineArrowDropUp} from 'react-icons/md';

import SvgWD from "../svg/svg.component";
import {adminSignOutStart} from '../../redux/admin/admin.action';


import './admin-header.styles.scss';

const AdminHeader = ({adminSignOutStart, history}) => {
    // const [childLink, setChildLink] = useState('fa fa-bars bar link');
    // const [path, setPath] = useState('');
    // useEffect(() => {
    //     const toggle = document.querySelector('.toggle');
    //     const menu = document.querySelector('.menu');
    //     function toggleMenu() {
    //         if(menu.classList.contains("active")){
    //             menu.classList.remove("active");
    //             setChildLink('fa fa-bars bar link');
    //         }
    //         else{
    //             menu.classList.add("active");
    //             setChildLink('fa fa-times bar link');
    //         }
    //     }
    //     toggle.addEventListener('click', toggleMenu, false);
    // },[]);

    const signOutAdmin = (event) => {
        event.preventDefault();
        adminSignOutStart(history);
        // setChildLink('fa fa-bars bar link');
    }
    useEffect(() => {
        var newPath = window.location.pathname;
        // setPath(newPath);
        const toggle = document.querySelector('.toggle');
        const signOut = document.querySelector('.signOut');
        const title = document.querySelector('.title');
        const product = document.querySelector('.product');
        const merchandise = document.querySelector('.merchandise');
        const banner = document.querySelector('.banner');
        const menu = document.querySelector('.menu');
        const discount = document.querySelector('.discount');
        const dashboard = document.querySelector('.dashboard');
        const speaker = document.querySelector('.speaker');
        const webinar = document.querySelector('.webinar');
        const others = document.querySelector('.others');
        const subscription = document.querySelector('.subscription');
        const topicSuggestion = document.querySelector('.topic-suggestion');
        const speakerOpportunity = document.querySelector('.speakerOpportunity');

        if(newPath === "/admin"){
            toggle.classList.add('hidden');
            signOut.classList.add('hidden');
            product.classList.add('hidden');
            title.classList.add('hidden');
            banner.classList.add('hidden');
            merchandise.classList.add('hidden');
            discount.classList.add('hidden');
            dashboard.classList.add('hidden');
            speaker.classList.add("hidden");
            webinar.classList.add("hidden");
            others.classList.add("hidden");
            subscription.classList.add("hidden");
            speakerOpportunity.classList.add("hidden");
            topicSuggestion.classList.add('hidden');
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
            webinar.classList.remove('hidden');
            others.classList.remove('hidden');
            subscription.classList.remove('hidden');
            speaker.classList.remove('hidden');
            topicSuggestion.classList.remove('hidden');
            speakerOpportunity.classList.remove('hidden');
        }
    });
    const [hover, setHover] = useState(false);
    return (
        <div className="header-div">
            <nav className="header-menu">
                <div className="logo">
                    <Link to="/"><SvgWD height={80} width={80}/></Link>   
                </div>
                <label htmlFor="btn" className="icon">
                    <span className="fa fa-bars toggle"></span>
                </label>
                <input type="checkbox" id="btn"/>
                <ul className="menu">  
                    <li className="item dashboard hidden"><Link className="link" to='/admin/dashboard'>Dashboard</Link></li>
                    
                    <li className="header-ul-li item webinar hidden" onMouseLeave = {() => setHover(false)}>
                        <label htmlFor="btn-1" className="show">Webinar +</label>
                        <Link className="link" to="#" onMouseEnter={() => setHover(true)}>Webinar 
                        {
                            hover ? <MdOutlineArrowDropUp/> : <MdOutlineArrowDropDown/>
                        }
                        </Link>
                        <input type="checkbox" id="btn-1"/>
                        <ul className="header-ul">
                            <li className="header-ul-li-ul-li item title hidden">
                                <Link to="/admin/title" className="link">Title</Link>
                            </li>
                            <li className="header-ul-li-ul-li item merchandise hidden">
                                <Link to="/admin/merchandise" className="link">Merchandise</Link>
                            </li>
                            <li className="header-ul-li-ul-li item product hidden">
                                <Link to="/admin/product" className="link">Product</Link>
                            </li>
                            <li className="header-ul-li-ul-li item discount hidden">
                                <Link to="/admin/discount" className="link">Discount</Link>
                            </li>
                        </ul>
                    </li>

                    <li className="header-ul-li item others hidden" onMouseLeave = {() => setHover(false)}>
                        <label htmlFor="btn-2" className="show">Others +</label>
                        <Link className="link" to="#" onMouseEnter={() => setHover(true)}>Others 
                        {
                            hover ? <MdOutlineArrowDropUp/> : <MdOutlineArrowDropDown/>
                        }
                        </Link>
                        <input type="checkbox" id="btn-2"/>
                        <ul className="header-ul">
                            <li className="header-ul-li-ul-li item speaker hidden">
                                <Link to="/admin/speaker" className="link">speaker</Link>
                            </li>
                            <li className="header-ul-li-ul-li item speakerOpportunity hidden">
                                <Link to="/admin/speaker-opportunity" className="link">spkr. Opportunity</Link>
                            </li>
                            <li className="header-ul-li-ul-li item topic-suggestion hidden">
                                <Link to="/admin/topic-suggestion" className="link">Suggest Topic</Link>
                            </li>
                            <li className="header-ul-li-ul-li item banner hidden">
                                <Link to="/admin/banner" className="link">banner</Link>
                            </li>
                            <li className="header-ul-li-ul-li item subscription hidden">
                                <Link to="/admin/subscription" className="link">subscription</Link>
                            </li>
                        </ul>
                    </li>
                    <li className="item signOut hidden link" style={{cursor: 'pointer'}} onClick={signOutAdmin}>
                        <Link className="link" to='#'>
                            Sign Out
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
)};
const mapDispatchToProps = dispatch => ({
    adminSignOutStart: (history) => dispatch(adminSignOutStart({history}))
})
export default withRouter(connect(null, mapDispatchToProps)(AdminHeader));