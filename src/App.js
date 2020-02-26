
import React from "react";
// import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import { AuthProvider } from "./Auth";
import PrivateRoute from "./PrivateRoute";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import CuisineSelection from "./components/CuisineSelection/CuisineSelection";
import RecipeDetails from "./components/RecipeDetails/RecipeDetails";

const App = () => {

  return(
    <AuthProvider>
      <Router>
        <div>
          <PrivateRoute exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/cuisine" component={CuisineSelection} />
          <Route exact path="/recipeDetails/:recipeId" component={RecipeDetails} />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
