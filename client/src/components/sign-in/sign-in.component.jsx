import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';

import './sign-in.styles.scss';

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { googleSignInStart, emailSignInStart } from './../../redux/user/user.action';

const SignIn = ({ emailSignInStart, googleSignInStart }) => {
    const [userCredentials, setUserCredentials] = useState({email: '', password: ''});
    const { email, password } = userCredentials;

    const handleSubmit = async (event) =>{
        event.preventDefault();
        emailSignInStart(email, password);

        // try{
        //     await auth.signInWithEmailAndPassword(email, password);
        //     this.setState(
        //         {
        //             email:'',
        //             password:''
        //         }
        //     );
        // }
        // catch(error){
        //     console.error(error);
        // }
    } 

    const handleChange= (event) =>{
        const {name, value} = event.target;
        setUserCredentials({ ...userCredentials, [name]: value });
    }

    return (
        <div className = 'sign-in'>
            <h2 className="title">I already have an account</h2>
            <span>Sign in with your email and password</span>

            <form onSubmit={handleSubmit}>
                <FormInput 
                    type='email' 
                    name="email" 
                    value={email}
                    label='Email'
                    handleChange={handleChange}
                    required 
                />
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
                        value="Submit Form"
                    >
                        Sign In
                    </CustomButton>
                    <CustomButton
                        type="button"
                        onClick={googleSignInStart}
                        isGoogleSignIn
                    >
                        Sign In with Google
                    </CustomButton>
                </div>
            </form>
            <p className="forgot-password">
                <Link to= '/forgot-password'>Forgot Password?</Link>
            </p>
        </div>
    )
    
}

const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart({email, password}))
})

export default connect(null, mapDispatchToProps)(SignIn);