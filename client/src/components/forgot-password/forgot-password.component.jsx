import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import {passwordResetWithEmailStart} from '../../redux/user/user.action';

import './forgot-password.styles.scss';

const ForgotPasswordComponent = ({passwordResetWithEmailStart}) => {
    const [email, setEmail] = useState('');

    const handleChange= (event) =>{
        const {value} = event.target;
        setEmail(value);
    } 

    const handleSubmit = (event) => {
        event.preventDefault();
        passwordResetWithEmailStart(email);
    }

    return (
        <div className = 'sign-in'>
            <h2 className="title">Forgot Password</h2>
            <span>Enter your email.</span>
    
            <form onSubmit={handleSubmit}>
                <FormInput 
                    type='email' 
                    name="email" 
                    value={email}
                    label='Email'
                    handleChange={handleChange}
                    required 
                />
                <div className='buttons'>
                    <CustomButton
                        type="submit"
                        value="Submit"
                    >
                        Send Reset Email
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
    passwordResetWithEmailStart: (email) => dispatch(passwordResetWithEmailStart(email))
})

export default connect(null, mapDispatchToProps)(ForgotPasswordComponent);