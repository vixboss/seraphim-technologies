import React, {useState, useEffect} from "react";
import { connect } from "react-redux";
import $ from 'jquery';

import { adminSignIn } from "../../redux/admin/admin.action"; 

import './admin-signin.styles.scss';

const AdminSignIn = ({adminSignIn}) => {
    useEffect(() =>  {
        // Jquery Code 
        $( ".input" ).focusin(function() {
            $( this ).find( "span" ).animate({"opacity":"0"}, 200);
          });
          
          $( ".input" ).focusout(function() {
            $( this ).find( "span" ).animate({"opacity":"1"}, 300);
          });
          
        //   $(".login").submit(function(){
        //     $(this).find(".submit i").removeAttr('class').addClass("fa fa-check").css({"color":"#fff"});
        //     $(".submit").css({"background":"#2ecc71", "border-color":"#2ecc71"});
        //     $(".feedback").show().animate({"opacity":"1", "bottom":"-80px"}, 400);
        //     $("input").css({"border-color":"#2ecc71"});
        //     return false;
        //   });
        // End of Jquery Code
    });  

    const [adminCredentials, setAdminCredentials] = useState({ email: '', password: ''});
    const {email, password} = adminCredentials;

    const handleChange= (event) =>{
        const {name, value} = event.target;
        setAdminCredentials({ ...adminCredentials, [name]: value });
    }

    const handleSubmit = async(event) => {
        event.preventDefault();
        adminSignIn(email, password);
    }

    return(
        <div className="admin-sign-in">
            <form className="login" onSubmit={handleSubmit}>
                <fieldset>
                    <legend className="legend">Admin Login</legend>
                    <div className="input">
                        <input 
                            type="email" 
                            name="email"
                            value={email}
                            placeholder="Email" 
                            onChange={handleChange}
                            required 
                        />
                        <span><i className="fa fa-envelope-o"></i></span>
                    </div>
                    <div className="input">
                        <input 
                            type="password" 
                            name="password"
                            value={password}
                            placeholder="Password" 
                            onChange={handleChange}
                            required 
                        />
                        <span><i className="fa fa-lock"></i></span>
                    </div>
                    <button type="submit" className="submit"><i className="fa fa-long-arrow-right"></i></button>
                </fieldset>
            
                <div className="feedback">
                    login successful <br />
                    redirecting...
                </div>
            
            </form>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    adminSignIn: (email, password) => dispatch(adminSignIn({email, password}))
});
export default connect(null, mapDispatchToProps)(AdminSignIn);