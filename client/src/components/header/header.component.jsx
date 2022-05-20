import React, {useEffect, useState} from "react";
import { connect } from 'react-redux';
import { createStructuredSelector } from "reselect";
import $ from 'jquery';
import Divider from '@mui/material/Divider';
import { withRouter } from "react-router-dom";

import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import { selectCartHidden } from "../../redux/cart/cart.selector";
import { selectCurrentUser } from "../../redux/user/user.selector";
import { signOutStart } from "../../redux/user/user.action";
import SvgWD from "../svg/svg.component";
import { HeaderConatiner,LogoContainer, OptionsContainer, OptionDiv, OptionLink } from "./header.styles";
import './header.styles.scss';
import { Link } from "react-router-dom";

const Header = ({currentUser, hidden, signOutStart, history, match}) => {
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
    </nav>
)};
const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
});

const mapDispatchToProps = dispatch => ({
    signOutStart: () => dispatch(signOutStart())
})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
