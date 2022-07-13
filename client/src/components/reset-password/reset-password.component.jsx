import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { passwordResetStart } from '../../redux/user/user.action';

import './reset-password.styles.scss';

const ResetPasswordComponent = ({location, passwordResetStart}) => {
    const [password, setPassword] = useState('');

    const handleChange= (event) =>{
        const {value} = event.target;
        setPassword(value);
    } 

    const handleSubmit = (event) => {
        event.preventDefault();
        const queryParams = new URLSearchParams(location.search);
        const oobCode = queryParams.get('oobCode');
        passwordResetStart({oobCode, password});
    }
    return (
        <div className = 'sign-in'>
            <h2 className="title">Reset Password</h2>
            <span>Enter new password.</span>
    
            <form onSubmit={handleSubmit}>
                <FormInput 
                    type='password' 
                    name="password" 
                    value={password}
                    label='Password'
                    handleChange={handleChange}
                    required 
                />
                <div className='buttons'>
                    <CustomButton
                        type="submit"
                        value="Submit"
                    >
                        Reset Password
                    </CustomButton>
                </div>
            </form>
            <p className = "back-to-login">
                <Link to='/signin'>Back To Login</Link>
            </p>
        </div>
    );
}

const mapDispatchToProps = dispatch => ({
    passwordResetStart: (payload) => dispatch(passwordResetStart(payload))
})

export default withRouter(connect(null, mapDispatchToProps)(ResetPasswordComponent));