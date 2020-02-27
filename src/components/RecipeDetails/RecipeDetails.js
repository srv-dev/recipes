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
    similarRecipes: [],
    recipeId: this.props.match.params.recipeId
  };

  getData = () => {
    const recipeId = this.props.match.params.recipeId;
    axios.get(`https://us-central1-recipes-498e6.cloudfunctions.net/getRecipeDetails?recipeId=${recipeId}`)
      .then( res => {
        this.setState({
          image: res.data.image,
          title: res.data.title,
          healthScore: res.data.healthScore,
          prepMinutes: res.data.readyInMinutes
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
      <div className="rd-container">
        <img src={this.state.image} className="coverImage"/>
        <div className="rd-details">
          <div className="row align-items-center">
        <h4 className="rd-title col-9"> {this.state.title} </h4>

<button class="btn btn-outline-success my-2 my-sm-0 col-3" onClick={ () => {
  this.props.history.push({
    pathname: '/cookingMode',
    state: { recipeId: this.state.recipeId,
    instructions: this.state.instructions
  }
})}}>Start Cooking</button>
</div>
<div className="row">
  <p className="col-4 offset-8 left p-prep"> Preparation Time : { this.state.prepMinutes } minutes </p>
</div>
      <div className="row">
        <p className="col-4 offset-8 left"> Health Score : { this.state.healthScore } </p>
        </div>
        <div className="row">
<div className="offset-1 col-7 ingredients left">

        <h4> Ingredients </h4>
        {
          this.state.ingredients.map( (ingredient) => (
            <li>
              <img src={ `https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}` } className="ingredient-img"/>
              { ingredient.name + ": " + ingredient.amount + " " + ingredient.unit  }
            </li>
          ))
        }
        </div>
        <div className="col-4 left">
      <h4> Nutritional values (per serving) </h4>
      {
        this.state.nutrients.slice(0,10).map( (nutrient) => (
          <li>
            { nutrient.title + " : " + nutrient.amount + nutrient.unit }
          </li>
        ))
      }
</div>
</div>


        <h4> Instructions </h4>
        <div className=" left">
<ol>
        {
          this.state.instructions.map( (instruction) => (
          <li>
              {  instruction.step }
          </li>
          ))
        }
        </ol>
      </div>
    </div>
        <h4 class="sr-title"> Similar Recipes </h4>
        {
          this.state.similarRecipes.map( (recipe) => (
            <div className="qr-recipe-card">
            <div className="qr-image">
            <Link to= {{
              pathname: `/recipeDetails/${recipe.id}`
            }}>
              <img src={`https://spoonacular.com/recipeImages/${recipe.image}`} className="imagesByTime" />
            </Link>
            </div>
            <div className="qr-details">
              <div className="qr-name">
                {recipe.title}
              </div>
              <div className="qr-time">
                <i className="material-icons">access_time</i> {recipe.readyInMinutes} minutes
                  {recipe.vegan?<i className="material-icons" title="Vegan friendly">eco</i>:""}

              </div>
            </div>
            </div>

          ))
        }

      </div>
    );
  }

}  //RecipeDetails END

export default RecipeDetails;
