import React, {useEffect, useState} from "react";
import { connect } from 'react-redux';
import { createStructuredSelector } from "reselect";
import $ from 'jquery';
import Divider from '@mui/material/Divider';
import { withRouter } from "react-router-dom";
import Tooltip from '@mui/material/Tooltip';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {MdOutlineArrowDropDown, MdOutlineArrowDropUp} from 'react-icons/md';

import { searchCollectionsStart } from "../../redux/shop/shop.actions";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import { selectCartHidden } from "../../redux/cart/cart.selector";
import { selectCurrentUser } from "../../redux/user/user.selector";
import { signOutStart } from "../../redux/user/user.action";
import SvgWD from "../svg/svg.component";
import { HeaderConatiner,LogoContainer, OptionsContainer, OptionDiv, OptionLink } from "./header.styles";
import './header.styles.scss';
import { Link } from "react-router-dom";

const Header = ({currentUser, hidden, signOutStart, history, match, searchCollectionsStart}) => {
    // const [childLink, setChildLink] = useState('fa fa-bars bar link');
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
    // }, []);

    // const removeHighlightClass = () => {
    //     $('.menu').children('li:not(:first-child)').each(function(){
    //         $(this).children('a').removeClass("active-nav");
    //     });
    // }
    
    // useEffect(() => {
    //     $('.item-highlight').click(function() {
    //         removeHighlightClass();
    //         $(this).children('a').addClass("active-nav");
    //     });

    //     // On Logo click.
    //     $('.logo').click(function() {
    //         removeHighlightClass();
    //         $(this).next().children('a').addClass('active-nav');
    //     });

    //     // On Page Load or navigation
    //     const path = history.location.pathname.split('/')[1];
        
    //     if(path === 'shop' || path === 'payment' || path === 'checkout'){
    //         removeHighlightClass();
    //         $('.logo').next().next().children('a').addClass('active-nav');
    //     }
    //     else if(path === 'about'){
    //         removeHighlightClass();
    //         $('.logo').next().next().next().children('a').addClass('active-nav');
    //     }
    //     else if(path === 'contact'){
    //         removeHighlightClass();
    //         $('.logo').next().next().next().next().children('a').addClass('active-nav');
    //     }
    //     else{
    //         removeHighlightClass();
    //         $('.logo').next().children('a').addClass('active-nav');
    //     }
    // });

    const [hover, setHover] = useState(false);
    const [hoverContact, setHoverContact] = useState(false);
    const [search, setSearch] = useState('');
    const [open, setOpen] = useState(false);
    
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleSearch = (event) => {
        const {value} = event.target;
        setSearch(value);
    }

    const searchStart = () => {
        searchCollectionsStart(search);
    }

    const [showSearch, setShowSearch] = useState(true);
    useEffect(() => {
        var pathname = history.location.pathname;

        switch(pathname) {
            case '/':
                return setShowSearch(true);
            case '/shop':
                return setShowSearch(true);
            case '/shop/healthcare':
                return setShowSearch(true);
            case '/shop/human%20resource':
                return setShowSearch(true);
            default:
                return setShowSearch(false)
        }
    });

    const getWindowDimensions = () => {
        const { innerWidth: width, innerHeight: height } = window;
        return {
            width,
            height
        };
    }
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        const handleResize = () => {
        setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const [hrHeight, setHrHeight] = useState('50px');

    useEffect(() => {
        windowDimensions.width < 968 ? setHrHeight('1px'): setHrHeight('50px');
    });
    
    return (
        <div className="header-div">
            <nav className = 'header-nav'>
                <div className="logo">
                    <Link to="/"><SvgWD height={80} width={80}/></Link>   
                </div>
                <label htmlFor="btn" className="icon">
                    <span className="fa fa-bars"></span>
                </label>
                <input type="checkbox" id="btn"/>
                <ul className="header-ul">
                    <li className="header-ul-li" >
                        <Link to="/" className="link">Home</Link>
                    </li>
                    <li className="header-ul-li" onMouseLeave = {() => setHover(false)}>
                        <label htmlFor="btn-1" className="show">Shop +</label>
                        <Link className="link" to="#" onMouseEnter={() => setHover(true)}>Shop 
                        {
                            hover ? <MdOutlineArrowDropUp/> : <MdOutlineArrowDropDown/>
                        }
                        </Link>
                        <input type="checkbox" id="btn-1"/>
                        <ul className="header-ul">
                            <li className="header-ul-li-ul-li">
                                <Link to="/shop/healthcare" className="link">Healthcare</Link>
                            </li>
                            <li className="header-ul-li-ul-li">
                                <Link to="/shop/human%20resource" className="link">Human Resource</Link>
                            </li>
                            <li className="header-ul-li-ul-li">
                                <Link to="/shop" className="link">Fragments</Link>
                            </li>
                            {/*<li>
                                <Link to="#" className="link">Icons</Link>
                            </li>*/}
                        </ul>
                    </li>
                    <li className="header-ul-li" onMouseLeave = {() => setHoverContact(false)}>
                        <label htmlFor="btn-2" className="show">Contact +</label>{}
                        <Link to="#" className="link" onMouseEnter={() => setHoverContact(true)}>Contact
                        {
                            hoverContact ? <MdOutlineArrowDropUp/> : <MdOutlineArrowDropDown/>
                        }
                        </Link>
                        <input type="checkbox" id="btn-2"/>
                        <ul className="header-ul">
                            <li className="header-ul-li-ul-li">
                                <Link to="/about" className="link">About us</Link>
                            </li>
                            <li className="header-ul-li-ul-li">
                                <Link to="/contact" className="link">Contact us</Link>
                            </li>
                            <li className="header-ul-li-ul-li">
                                <label htmlFor="btn-3" className="show more">More +</label>
                                <Link to="#" className="link">More
                                    <span className="fa fa-plus"></span>
                                </Link>
                                <input type="checkbox" id="btn-3"/>
                                <ul className="header-ul">
                                    <li className="header-ul-li-ul-li-ul-li">
                                        <Link to="/faq" className="link">FAQ</Link>
                                    </li>
                                    <li className="header-ul-li-ul-li-ul-li">
                                        <Link to="/subscribe" className="link">Subscribe</Link>
                                    </li>
                                    <li className="header-ul-li-ul-li-ul-li">
                                        <Link to="/speaker-opportunity" className="link">SPKR Opportunity</Link>
                                    </li>
                                    <li className="header-ul-li-ul-li-ul-li">
                                        <Link to="/topic-suggestion" className="link">Suggest Topic</Link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    {/*<li>
                        <Link to="#" className="link">Contact</Link>
                    </li>*/}
                    {
                        currentUser ?
                            <li className="header-ul-li" onMouseLeave = {() => setHover(false)}>
                                <label htmlFor="btn-4" className="show">Profile +</label>
                                <Link className="link" to="#" onMouseEnter={() => setHover(true)}>Profile 
                                {
                                    hover ? <MdOutlineArrowDropUp/> : <MdOutlineArrowDropDown/>
                                }
                                </Link>
                                <input type="checkbox" id="btn-4"/>
                                <ul className="header-ul">
                                    <li className="header-ul-li-ul-li">
                                        <Link to="/wishlist" className="link">Wishlist</Link>
                                    </li>
                                    <li className="header-ul-li-ul-li">
                                        <Link className="link" to='/' onClick={signOutStart}>SIGN OUT</Link>
                                    </li>
                                </ul>
                            </li>
                            :
                            <li className="item item-highlight">
                                <Link className="link" to='/signin'>SIGN IN</Link>
                            </li>
                    }
                    <li className="item cart-list header-ul-li">
                        <CartIcon className="cart"/>
                    </li>
                    {
                        showSearch && <li className="item cart-list mrg-btm-10 header-ul-li">
                            <Tooltip title="Search">
                                <i className="fa fa-search fa-2xl nav-search-icon icons" aria-hidden="true" style={{color: '#ffffff'}} onClick={handleClickOpen}></i>
                            </Tooltip>
                        </li>
                    }
                    {   
                        currentUser && 
                        <>  
                            <li className="item mrg-btm-10 header-ul-li" style={{color: '#DCDCDC'}}>
                                <Divider className = "divider-height" style={{height: hrHeight}} orientation="vertical" variant="middle"></Divider>
                            </li>
                        
                            <li className="item user-name-display header-ul-li">
                                <p style={{'marginBottom': '0'}}>Hi,</p>
                                <p>{currentUser.displayName}</p>
                            </li>
                        </>
                    }
                    {
                        hidden ? null : <CartDropdown/>
                    }
                </ul>
                <Dialog open={open} onClose={handleClose}>
                    <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="search"
                        label="Search Webinar"
                        type="text"
                        variant="standard"
                        name="search"
                        value={search}
                        onChange = {handleSearch}
                    />
                    </DialogContent>
                    <DialogActions>
                        <Button style={{color: '#6c757d'}} onClick={handleClose}>Cancel</Button>
                        <Button style={{color: '#6c757d'}} onClick={() => {handleClose(); searchStart();}}>Search</Button>
                    </DialogActions>
                </Dialog>
            </nav>
        </div>

    );
      {/*return(
        <nav className="header-menu">
            <ul className="menu">
                <li className="logo"><Link to="/"><SvgWD height={80} width={80}/></Link></li>
                <li className="item item-highlight"><Link className="link active-nav" to='/'>Home</Link></li>
                <li className="item item-highlight"><Link className="link" to="/shop">Shop</Link></li>
                <li className="item item-highlight"><Link className="link" to="/about">ABOUT US</Link></li>
                <li className="item item-highlight"><Link className="link" to="/contact">CONTACT US</Link></li>
                {
                    currentUser ?
                        <li className="item item-highlight">
                            <Link className="link" to='/' onClick={signOutStart}>SIGN OUT</Link>
                        </li>
                        :
                        <li className="item item-highlight">
                            <Link className="link" to='/signin'>SIGN IN</Link>
                        </li>
                }
                <li className="item cart-list">
                    <CartIcon className="cart"/>
                </li>
                {
                    showSearch && <li className="item cart-list">
                        <Tooltip title="Search">
                            <i className="fa fa-search nav-search-icon" aria-hidden="true" style={{color: '#ffffff'}} onClick={handleClickOpen}></i>
                        </Tooltip>
                    </li>
                }
                {   
                    currentUser && 
                    <>  
                        <li className="item" style={{color: '#DCDCDC'}}>
                            <Divider style={{height:'50px'}} orientation="vertical" variant="middle"></Divider>
                        </li>
                    
                        <li className="item user-name-display">
                            <p style={{'marginBottom': '0'}}>Hi,</p>
                            <p>{currentUser.displayName}</p>
                        </li>
                    </>
                }
                <li className="toggle"><a href="#">{React.createElement('i', {className: childLink})}</a></li>
                {
                    hidden ? null : <CartDropdown/>
                }
                
            </ul>
            <Dialog open={open} onClose={handleClose}>
                <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="search"
                    label="Enter Keyword"
                    type="text"
                    variant="standard"
                    name="search"
                    value={search}
                    onChange = {handleSearch}
                />
                </DialogContent>
                <DialogActions>
                    <Button style={{color: '#6c757d'}} onClick={handleClose}>Cancel</Button>
                    <Button style={{color: '#6c757d'}} onClick={() => {handleClose(); searchStart();}}>Search</Button>
                </DialogActions>
            </Dialog>
        </nav>
            
            )*/}
};
const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
});

const mapDispatchToProps = dispatch => ({
    signOutStart: () => dispatch(signOutStart()),
    searchCollectionsStart: (data) => dispatch(searchCollectionsStart(data))
})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
