import React, { useState, useEffect } from 'react';
import app from "../../base";
import axios from 'axios';

const BASE_URL = 'http://localhost:5000/recipes-498e6/us-central1/recipes';
// const BASE_URL = 'https://us-central1-recipes-498e6.cloudfunctions.net/recipes';

const Home = (props) => {

  console.log(' HOME!! ');
  const [user, setUser] = useState(null);
  const [recipes, setRecipes] = useState(null);

  const recipesData = () => {
    // ES6 object destructuring assigns user key in params to user variable.
    const { user } = props.match.params;

    axios.get(`${BASE_URL}`)
      .then( res => {
        console.log(res);
        setUser(res.data);
      })
      .catch( err => console.warn(err) );
  }

  useEffect(recipesData, [props.match.params.user]);

  return(
    <>
      <h1> Home </h1>
      <h3> Hello { app.auth().currentUser.displayName } </h3>
      <button onClick={ () => app.auth().signOut() }> Sign Out </button>
    </>
  );
};

export default Home;
