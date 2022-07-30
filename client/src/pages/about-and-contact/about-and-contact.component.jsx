import React, {useEffect} from 'react';
import { withRouter } from 'react-router-dom';

import AboutComponent from '../../components/about/about.component';
import ContactComponent from '../../components/contact/contact.component';
import './about-and-contact.styles.scss';

const AboutAndContactPage = ({location}) => {
    useEffect(() => {
        window.scrollTo(0,0);
    }, []);
    return(
        <>
            {
                location.pathname === '/contact' ? <ContactComponent/> : <AboutComponent/>
            }
        </>
    )
};
export default withRouter(AboutAndContactPage);