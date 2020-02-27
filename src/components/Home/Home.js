import React, { useState, useEffect } from 'react';
import app from "../../base";
import axios from 'axios';
import {Link} from 'react-router-dom';
import Autosuggest from 'react-autosuggest';

import './Home.css';

const BASE_URL = 'https://us-central1-recipes-498e6.cloudfunctions.net/home';

class Home extends React.Component {

  state = {
    value: '',
    suggestions: [],
    isLoading: false,
    user: '',
    recipes: '',
    quickRecipes: [],
    popularRecipes: [],
    baseUri: '',
    cuisines: [],
  };

  componentDidMount = () => {

    axios.get(`${BASE_URL}?userName=${app.auth().currentUser.email}`)
      .then( res => {

        console.log("QUICK RECIPES: ",res);

        // Quick Recipes list
        let quickRecipesList = [];
        res.data.quickRecipes.results.forEach( result => (
          quickRecipesList.push(result)
        ));
        this.setState({quickRecipes: quickRecipesList});
        console.log("IMAGES: ", this.state.quickRecipes);

        // Popular recipes
        this.setState({ baseUri : res.data.popularRecipes.baseUri });
        let popRecipesList = [];
        res.data.popularRecipes.results.forEach( result => (
          popRecipesList.push(result)
        ));
        this.setState({ popularRecipes: popRecipesList });

        // Cuisines
        let cuisinesList = [];
        res.data.cuisines.forEach( cuisine => {
          cuisinesList.push(cuisine);
        });
        this.setState( {cuisines: cuisinesList} );

      })
      .catch( err => console.warn(err));
  } // componentDidMount() END

  getSuggestionValue = (suggestion) => {
    return suggestion.title;
  }

  renderSuggestion = (suggestion) => {
    return (
      <div>
        <img src={"https://spoonacular.com/recipeImages/"+suggestion.imageUrls[0]} className="thumb-img" />
        <span>{suggestion.title}</span>
      </div>
    );
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  shouldRenderSuggestions = (value) => {
    return value.trim().length > 2;
  }

  onSuggestionsFetchRequested = ({ value }) => {

    this.setState({ isLoading: true });
    axios.get(`https://us-central1-recipes-498e6.cloudfunctions.net/searchRecipes?searchQuery=${value}`)
    .then(res => {
      console.log(res);

      this.setState({ suggestions: res.data.results,
      isLoading: false
    })

    })
    .catch( err => console.warn(err) );
  };

  onSuggestionSelected = (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) =>{
    console.log(suggestion);
    this.props.history.push(`/recipeDetails/${suggestion.id}`);
  }
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };


  render() {

    const { value, suggestions,isLoading } = this.state;
    const inputProps = {
     placeholder: "Search Recipes",
     value,
     onChange: this.onChange
    };

    return(

      <div id="home">
        <h3> Hello { app.auth().currentUser.displayName } </h3>

        <button onClick={ () => app.auth().signOut() }> Sign Out </button>
        <hr />

        <Autosuggest
          suggestions={this.state.suggestions}
          shouldRenderSuggestions={this.shouldRenderSuggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={this.getSuggestionValue}
          renderSuggestion={this.renderSuggestion}
          onSuggestionSelected={this.onSuggestionSelected}
          inputProps={inputProps}
        />

        <h3> QUICK RECIPES </h3>
        <div className="quickRecipes-container">
        <div className="quickRecipes">
        {
          this.state.quickRecipes.map( recipe => (
            <div className="qr-recipe-card">
            <div className="qr-image">
            <Link to= {{
              pathname: `/recipeDetails/${recipe.id}`
            }}>
              <img src={recipe.image} className="imagesByTime" />
            </Link>
            </div>
            <div className="qr-details">
              <div className="qr-name">
                {recipe.title}
              </div>
              <div className="qr-time">
                <i class="material-icons">access_time</i> {recipe.readyInMinutes} minutes
                  {recipe.vegan?<i class="material-icons" title="Vegan friendly">eco</i>:""}

              </div>
            </div>
          </div>
          ))
        }
        </div>
        </div>

        <h3> POPULAR RECIPES </h3>
        <div className="popularRecipes">
        {
          this.state.popularRecipes.map( recipe => (
            <Link to= {`/recipeDetails/${recipe.id}`}>
              <img src={`${this.state.baseUri}/${recipe.image}`} className="popularImages" />
            </Link>
          ))
        }
        </div>

        <h3> CUISINES </h3>
        <div class="cuisine">
          {
            this.state.cuisines.map( cuisine => (
              <img src="/cuisine.jpeg" alt="cuisine" className="cuisine-img" />
            ))
          }
        </div>
      </div>
    );
  }
};

export default Home;
