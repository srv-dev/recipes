
import React from "react";
// import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import app from "./base";
import LandingPage from "./LandingPage";
import Home from "./components/Home/Home";
import { AuthProvider } from "./Auth";
import PrivateRoute from "./PrivateRoute";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import CuisineSelection from "./components/CuisineSelection/CuisineSelection";
import RecipeDetails from "./components/RecipeDetails/RecipeDetails";
import CookingMode from "./components/CookingMode/CookingMode";
import * as firebase from "firebase/app";

class App extends React.Component {

  state = {
    authUser: null
  };

  componentDidMount = () => {
    this.listener = firebase.auth().onAuthStateChanged(
      authUser => {
        authUser
          ? this.setState({ authUser })
          : this.setState({ authUser: null });
      },
    );
  };

  componentWillUnmount = () => {
    this.listener();
  };

  render() {
  return(
    <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <a class="navbar-brand" href="/home">Home</a>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
        </ul>
        {
          this.state.authUser
          ?
          <button class="btn btn-outline-success my-2 my-sm-0" onClick={ () => {app.auth().signOut();localStorage.removeItem('userId');} }> Sign Out </button>
          :
          <button class="btn btn-outline-success my-2 my-sm-0" onClick={ () => this.props.history.push('/login') }> Login </button>
        }

      </div>
    </nav>
    <AuthProvider>

      <Router>
      <div>
          <Route exact path='/' component={LandingPage} />
          <Route exact path='/login' component={Login} />
          <PrivateRoute exact path="/home" component={Home} />
          <Route exact path="/signup" component={SignUp} />
          <PrivateRoute exact path="/cuisine" component={CuisineSelection} />
          <PrivateRoute exact path="/recipeDetails/:recipeId" component={RecipeDetails} />
          <PrivateRoute exact path="/cookingMode/" component={CookingMode} />
        </div>
      </Router>
    </AuthProvider>
    </div>
  );
}
}


export default App;
