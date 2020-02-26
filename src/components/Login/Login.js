import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import app from "../../base";
import { AuthContext } from "../../Auth.js";

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
        history.push("/");
      } catch( error ) {
        alert(error);
      }
  }, [history]);

  const { currentUser } = useContext(AuthContext);

  if(currentUser) {
    return <Redirect to="/" />;
  }

  return(
    <div>
      <h1> Log in </h1>
      <form onSubmit={handleLogin}>
        <label> Email
          <input name="email" type="email" placeholder="Email" />
        </label> <br/>
        <label> Password
          <input name="password" type="password" placeholder="Password" />
        </label> <br/>
        <button type="submit"> Log in </button>
      </form>
    </div>
  );  // return

};  // SignUp()

export default withRouter(Login);
