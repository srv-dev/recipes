import React from 'react';
import axios from 'axios';
import app from "../../base";

import './CuisineSelection.css';

// const BASE_URL = 'http://localhost:5000/recipes-498e6/us-central1/recipes';


export default class CuisineSelection extends React.Component {

  state = {
    selectedCuisine : []
  };

  onCuisineSelect = (event) => {

    let cuisineList = this.state.selectedCuisine;
      if( event.target.checked ) {
        cuisineList.push(event.target.value);
      } else {
        cuisineList.splice(cuisineList.indexOf(event.target.value), 1);
      }
      this.setState({selectedCuisine : cuisineList});
      console.log('sel CUISINE: ', this.state.selectedCuisine);

  };

  postCuisines = () => {
    axios.post('https://us-central1-recipes-498e6.cloudfunctions.net/addUserConfig', {
      "userName": localStorage.getItem('userId'),
      "cuisines": this.state.selectedCuisine
    })
    .then( res => {
      console.log(res);
      this.props.history.push('/home');
    })
    .catch( err => console.warn(err) );
  };

  render() {

    // console.log('USER: ', app.auth().currentUser.email);
    const cuisines = [ 'African', 'American', 'British','Cajun','Caribbean','Chinese','Eastern European','European','French','German','Greek','Indian','Irish','Italian','Japanese','Jewish','Korean','Latin American','Mediterranean','Mexican','Middle Eastern','Nordic','Southern','Spanish','Thai','Vietnamese' ];

    return (
      <div className="cuisines-div">
        <ul>
        {
          cuisines.map( (cuisine, index) => (

            <li>
                <input type='checkbox' value={cuisine} id={cuisine.replace(' ','_')} onChange = { this.onCuisineSelect } />
                <label for={cuisine.replace(' ','_')}>{cuisine}</label>
            </li>

          ))
        }
        </ul>
        <button onClick={this.postCuisines} className="next-button">Next</button>
      </div>
    );
  }
};
