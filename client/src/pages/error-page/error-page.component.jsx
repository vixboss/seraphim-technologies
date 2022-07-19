import React from 'react';
import { Link } from 'react-router-dom';

import './error-page.styles.scss';

const ErrorPage = () => {
    return(
        <>
            <div>
                <div id="notfound">
                    <div className="notfound">
                        <div className="notfound-404">
                            <h1>404</h1>
                        </div>
                        <h2>We are sorry, Page not found!</h2>
                        <p>The page you are looking for might have been removed had its name changed or is temporarily unavailable.</p>
                        <Link to="/">Back To Homepage</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ErrorPage;