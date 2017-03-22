/**
 * When user clicks create this is called and it creates a custom bundle
 */
import * as util from './recipe.util';

/*eslint-disable*/
let recipeData = {};

export
function setRecipeData(recipe) {
  console.log(recipe);
  console.log(__RECIPE__);
  recipeData = recipe;   
}

/**
 * Clients will call create and it will bind the visualization to the provided element.
 */
export function createRecipe(elementId) {
  util.initContainer(elementId);
  create(recipeData);
}

function create(recipe) {
  alert('creating recipe with ' + recipe);
}
/*eslint-enable*/
