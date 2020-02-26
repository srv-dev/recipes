import React from 'react';
import app from "../../base";
import {Link} from 'react-router-dom';
import axios from 'axios';

import './RecipeDetails.css';

class RecipeDetails extends React.Component {

  state = {
    image: '',
    title: '',
    healthScore: 0,
    prepMinutes: 0,
    nutrients: [],
    ingredients: [],
    instructions: [],
    similarRecipes: []
  };



  getData = () => {
    const recipeId = this.props.match.params.recipeId;
    axios.get(`https://us-central1-recipes-498e6.cloudfunctions.net/getRecipeDetails?recipeId=${recipeId}`)
      .then( res => {
        this.setState({
          image: res.data.image,
          title: res.data.title,
          healthScore: res.data.healthScore,
          prepMinutes: res.data.preparationMinutes
        });

        // Nutrients info
        let nutrientsList = [];
        res.data.nutrition.nutrients.forEach( nutrient => {
          nutrientsList.push(nutrient);
        });
        this.setState({ nutrients: nutrientsList });

        // Ingredients info
        let ingredientsList = [];
        res.data.extendedIngredients.forEach( ingredient => {
          ingredientsList.push(ingredient);
        });
        this.setState({ ingredients: ingredientsList });

        // Instructions info
        let stepInstructions = [];
        res.data.analyzedInstructions[0].steps.forEach( steps => {
          stepInstructions.push(steps);
        });
        this.setState({ instructions: stepInstructions });
      })
      .catch( err => console.warn(err) );

      // Similar RECIPES
      axios.get(`https://us-central1-recipes-498e6.cloudfunctions.net/getSimilarRecipes?recipeId=${recipeId}`)
        .then( res => {
          this.setState ({ similarRecipes : res.data });
        })
        .catch( err => console.warn(err) );
  }

  componentDidMount = () => {
    this.getData();
  };


    componentDidUpdate(prevProps) {
      if(prevProps.match.params.recipeId !== this.props.match.params.recipeId){
        this.getData();
      }
    }

  render() {
    return(
      <div>
        <h2> Recipe Details </h2>
        <img src={this.state.image} className="coverImage"/>
        <h4> {this.state.title} </h4>
        <h4> Health Score : { this.state.healthScore } </h4>
        <h4> Preparation Time : { this.state.prepMinutes } minutes </h4>
        <h4> Nutritional values (per serving) </h4>
        {
          this.state.nutrients.slice(0,10).map( (nutrient) => (
            <li>
              { nutrient.title + " : " + nutrient.amount + nutrient.unit }
            </li>
          ))
        }
        <h4> Ingredients </h4>
        {
          this.state.ingredients.map( (ingredient) => (
            <li>
              <img src={ `https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}` } className="ingredient-img"/>
              { ingredient.name + ": " + ingredient.amount + " " + ingredient.unit  }
            </li>
          ))
        }
        <h4> Instructions </h4>
        {
          this.state.instructions.map( (instruction) => (
          <li>
              { instruction.number + "." + " " + instruction.step }
          </li>
          ))
        }
        <h4> Similar Recipes </h4>
        {
          this.state.similarRecipes.map( (recipe) => (
            <Link to= {{
              pathname: `/recipeDetails/${recipe.id}`
            }}>
            <img src={`https://spoonacular.com/recipeImages/${recipe.image}`} className="similar-img"/>
              </Link>
          ))
        }
      </div>
    );
  }

}  //RecipeDetails END

export default RecipeDetails;
