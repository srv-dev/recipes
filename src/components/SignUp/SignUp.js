import React, { useCallback } from "react";
import { withRouter } from "react-router";
import {useHistory} from 'react-router-dom';
import app from "../../base";

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
      console.log('BEFORE HISTORY');
      history.push('/cuisine');
      console.log('AFTER HISTORY');

    } catch( error ) {
      console.log(error.message);
    }
  }, []);

  return(
    <div>
      <h1> Sign Up </h1>
      <form onSubmit={handleSignUp}>
        <label> Name
          <input name="name" type="text" placeholder="Name" />
        </label> <br/>
        <label> Email
          <input name="email" type="email" placeholder="Email" />
        </label> <br/>
        <label> Password
          <input name="password" type="password" placeholder="Password" />
        </label> <br/>
        <button type="submit"> Sign Up </button>
      </form>
    </div>
  );  // return

};  // SignUp()

export default withRouter(SignUp);
