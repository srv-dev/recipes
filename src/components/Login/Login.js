import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import app from "../../base";
import { AuthContext } from "../../Auth.js";
import {Link} from 'react-router-dom';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBIcon } from 'mdbreact';
import './Login.css';

const Login = ({ history }) => {

  const handleLogin = useCallback(

    async event => {
      event.preventDefault();

      const { email, password } = event.target.elements;
      try {
        await app
        .auth()
        .signInWithEmailAndPassword(email.value, password.value);
        // console.log('CURR USER:', app.auth().currentUser);
        localStorage.setItem('userId', email.value);
        history.push("/home");

      } catch( error ) {
        alert(error);
      }
  }, [history]);

  const { currentUser } = useContext(AuthContext);
  if(currentUser) {
    return <Redirect to="/home" />;
  }


  return(
    <div class="wrapper fadeInDown">
      <div id="formContent">
        <div class="fadeIn first">
          <div class="header pt-3 peach-gradient">
          <div class="row d-flex justify-content-center">
            <h3 class="white-text mb-3 pt-3 font-weight-bold">Log in</h3>
          </div>
        </div>
        </div>

        <form onSubmit={handleLogin}>
          <input type="text" id="login" name="email" className="fadeIn second login-field" placeholder="login"/>
          <input type="password" id="password" className="fadeIn third login-field" name="password" placeholder="password"/>

          <input type="submit" className="fadeIn fourth peach-gradient" value="Log In"/>
        </form>

        <div id="formFooter">
          Don't have an account? &nbsp;
          <Link to="/signup" className="signup-link">Sign Up</Link>
        </div>

      </div>
    </div>
  );  // return

};  // SignUp()

export default withRouter(Login);
