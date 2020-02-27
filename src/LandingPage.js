import React from 'react';
import {Link} from 'react-router-dom';
import './App.css';
import ReactDOM from 'react-dom';


class LandingPage extends React.Component {

  render(){
    return(
      <div className="landing-container">
        <div className="viewport-header text-focus-in">
          <h2><Link to='/login' className='login-link'> DELICIOUS RECIPES</Link></h2>
        </div>

        <img src="/food-image.jpg" className="food-image" alt="Food" />
      </div>
    );
  } // render
} // LandingPage

export default LandingPage;
