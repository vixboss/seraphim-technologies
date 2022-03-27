import React from "react";
import { Link } from "react-router-dom";
import './footer.styles.scss';

const Footer = () => {
    const year = new Date().getFullYear();
    
    return (
        <div className='footer'>
            <span> &copy; {year} Copyright &nbsp;
                <Link to="/" style={{'fontWeight': 'bold !important'}} className= "footer-link">
                    <strong>Webinar Dock</strong>
                </Link>. All Rights Reserved 
            </span>
        </div>
    )
};

export default Footer;