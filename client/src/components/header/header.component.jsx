import React, {useEffect, useState} from "react";
import { connect } from 'react-redux';
import { createStructuredSelector } from "reselect";

import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import { selectCartHidden } from "../../redux/cart/cart.selector";
import { selectCurrentUser } from "../../redux/user/user.selector";
import { signOutStart } from "../../redux/user/user.action";
import SvgWD from "../svg/svg.component";
import { HeaderConatiner,LogoContainer, OptionsContainer, OptionDiv, OptionLink } from "./header.styles";
import './header.styles.scss';
import { Link } from "react-router-dom";

const Header = ({currentUser, hidden, signOutStart}) => {
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
    return (
    // <HeaderConatiner>
    //     <LogoContainer to='/'>
    //         <SvgWD height={80} width={80}/>
    //     </LogoContainer>
        
    //     <OptionsContainer className="header-menu">
    //         <OptionLink to='/' className="active">
    //             HOME
    //         </OptionLink>
    //         <OptionLink to='/shop'>
    //             SHOP
    //         </OptionLink>
    //         <OptionLink to='/shop'>
    //             CONTACT
    //         </OptionLink>
    //         {
    //             currentUser ?
    //                 <OptionDiv onClick={signOutStart}>SIGN OUT</OptionDiv>
    //                 :
    //                 <OptionLink to='/signin'>SIGN IN</OptionLink>
    //         }
    //         <CartIcon/>
    //         <OptionLink>
    //             <input type="checkbox" id="check"/>
    //             <label for="check" className="checkBtn">
    //                 <i className="fa fa-bars"></i>
    //             </label>
    //         </OptionLink>
    //     </OptionsContainer>
    //     {
    //         hidden ? null : <CartDropdown/>
    //     }
    // </HeaderConatiner>

    <nav className="header-menu">
        {/*<label className="logo">
            <SvgWD height={80} width={80}/>
        </label>*/}
        <ul className="menu">
            <li className="logo"><Link to="/"><SvgWD height={80} width={80}/></Link></li>
            <li className="item"><Link className="link" to='/'>Home</Link></li>
            <li className="item"><Link className="link" to="/shop">Shop</Link></li>
            <li className="item"><Link className="link" to="/">CONTACT</Link></li>
            {
                currentUser ?
                    <li className="item">
                        <Link className="link" onClick={signOutStart}>SIGN OUT</Link>
                    </li>
                    :
                    <li className="item">
                        <Link className="link" to='/signin'>SIGN IN</Link>
                    </li>
            }
            <li className="item cart-list">
                <CartIcon className="cart"/>
            </li>
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
export default connect(mapStateToProps, mapDispatchToProps)(Header);
