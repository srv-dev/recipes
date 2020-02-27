import React, { useCallback } from "react";
import { withRouter } from "react-router";
import {useHistory} from 'react-router-dom';
import app from "../../base";
import {Link} from 'react-router-dom';
import '../Login/Login.css';

const SignUp = ({ props }) => {

  const history = useHistory();

  const handleSignUp = useCallback(async event => {
    event.preventDefault();
    console.log('eles: ', event.target.elements);
    const { name, email, password } = event.target.elements;

  	// const [name, setName] = useState('');
  	// const [email, setEmail] = useState('');
  	// const [password, setPassword] = useState('');

    try {
      await app.auth().createUserWithEmailAndPassword(email.value, password.value);
      app.auth().currentUser.updateProfile({
			     displayName: name.value
		  })
      localStorage.setItem('userId', email.value);
      history.push('/cuisine');

    } catch( error ) {
      alert(error.message);
    }
  }, []);

  return(
    <div class="wrapper fadeInDown">
      <div id="formContent">
        <div class="fadeIn first">
          <div class="header pt-3 peach-gradient">
          <div class="row d-flex justify-content-center">
            <h3 class="white-text mb-3 pt-3 font-weight-bold">Sign Up</h3>
          </div>
        </div>
        </div>

      <form onSubmit={handleSignUp}>
        <input type="text" id="name" name="name" className="fadeIn second login-field" placeholder="Your name"/>
        <input type="text" id="login" name="email" className="fadeIn second login-field" placeholder="Your email"/>
        <input type="password" id="password" className="fadeIn third login-field" name="password" placeholder="password"/>

        <input type="submit" className="fadeIn fourth peach-gradient" value="Sign Up"/>
      </form>

      <div id="formFooter">
         Already have an account? &nbsp;
        <Link to="/login" className="signup-link">Login</Link>
      </div>
    </div>
    </div>
  );  // return

};  // SignUp()

export default withRouter(SignUp);
