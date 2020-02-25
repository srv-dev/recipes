import React from 'react';
import axios from 'axios';
import './CuisineSelection.css';

const BASE_URL = 'http://localhost:5000/recipes-498e6/us-central1/recipes';


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

  


  render() {

    const cuisines = [ 'African', 'American', 'British','Cajun','Caribbean','Chinese','Eastern European','European','French','German','Greek','Indian','Irish','Italian','Japanese','Jewish','Korean','Latin American','Mediterranean','Mexican','Middle Eastern','Nordic','Southern','Spanish','Thai','Vietnamese' ];

    return (
      <div>
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
      </div>
    );
  }
};
