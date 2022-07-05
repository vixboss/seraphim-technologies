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
    const [childLink, setChildLink] = useState('fa fa-bars bar link');
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
    }, []);

    const removeHighlightClass = () => {
        $('.menu').children('li:not(:first-child)').each(function(){
            $(this).children('a').removeClass("active-nav");
        });
    }
    
    useEffect(() => {
        $('.item-highlight').click(function() {
            removeHighlightClass();
            $(this).children('a').addClass("active-nav");
        });

        // On Logo click.
        $('.logo').click(function() {
            removeHighlightClass();
            $(this).next().children('a').addClass('active-nav');
        });

        // On Page Load or navigation
        const path = history.location.pathname.split('/')[1];
        if(history.location.pathname === '/'){
            removeHighlightClass();
            $('.logo').next().children('a').addClass('active-nav');
        }
        else if(path === 'shop'){
            removeHighlightClass();
            $('.logo').next().next().children('a').addClass('active-nav');
        }
    });

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
            default:
                return setShowSearch(false)
        }
    });
    
    return (
    <nav className="header-menu">
        {/*<label className="logo">
            <SvgWD height={80} width={80}/>
        </label>*/}
        <ul className="menu">
            <li className="logo"><Link to="/"><SvgWD height={80} width={80}/></Link></li>
            <li className="item item-highlight"><Link className="link active-nav" to='/'>Home</Link></li>
            <li className="item item-highlight"><Link className="link" to="/shop">Shop</Link></li>
            <li className="item item-highlight"><Link className="link" to="/">CONTACT</Link></li>
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
)};
const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
});

const mapDispatchToProps = dispatch => ({
    signOutStart: () => dispatch(signOutStart()),
    searchCollectionsStart: (data) => dispatch(searchCollectionsStart(data))
})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
