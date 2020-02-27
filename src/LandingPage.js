import React from 'react';
import {Link} from 'react-router-dom';
import './App.css';
import ReactDOM from 'react-dom';
import axios from 'axios';


class LandingPage extends React.Component {

  state = {
    trivia: ''
  };

  componentDidMount() {
      axios.get('https://us-central1-recipes-498e6.cloudfunctions.net/foodTrivia')
        .then( res => {
          this.setState({ trivia: res.data.text })
          console.log('TRIVIA: ', this.state.trivia);
        })
        .catch( err => console.warn(err) );
  }

  render(){
    return(
      <div className="landing-container">
        <div className="viewport-header text-focus-in">
          <h2><Link to='/login' className='login-link'> DELICIOUS RECIPES</Link></h2><br/>
          <h4 className="trivia"> {this.state.trivia} </h4>
        </div>

        <img src="/food-image.jpg" className="food-image" alt="Food" />
      </div>
    );
  } // render
} // LandingPage

export default LandingPage;
