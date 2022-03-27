import React from 'react';

import AdminSignIn from '../../components/admin-signin/admin-signin.component';

import './admin-login.styles.scss';

const AdminLoginPage = () => {
    return (
        <div className='admin-login'>
            <AdminSignIn />
        </div>
    )
}

export default AdminLoginPage;