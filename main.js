'use strict'

/*Obtener y pintar la info*/
let infoRecipe = {};
const JSON_RECIPE = 'https://raw.githubusercontent.com/Adalab/recipes-data/master/rissoto-setas.json';
const pageTitle = document.querySelector('.page-title');
const ingredientList = document.querySelector('.ingredient-list');
const shippingCost = document.querySelector('.shipping-cost');

function getInfo () {
  fetch(JSON_RECIPE)
  .then(function(response){
    return response.json();
  })
  .then(function(json){
    infoRecipe.name = json.recipe.name;
    infoRecipe.ingredients = json.recipe.ingredients;
    infoRecipe.shipping = json.recipe['shipping-cost'];


    renderTitle();
    renderIngredientList();
    renderShippingCost();

  });
}

window.onload = getInfo;

function renderTitle() {
pageTitle.innerHTML = infoRecipe.name;
}

function renderIngredientList() {
  for (const ingredient of infoRecipe.ingredients) {
    ingredientList.innerHTML += `<li class="ingredient-item"><input class="checkbox-list" id="checkbox" type="checkbox" name="ingredient-checkbox" value="foo">
      <input type="text" name="ingredient-quantity" class="items" value="1" min="0"></input>
      <div class="ingredient-info">
        <h3 class="product">${ingredient.product}</h3>
        <h4 class="brand">${ingredient.brand ? ingredient.brand : ''}</h4>
        <p class="quantity">${ingredient.quantity}</p>
      </div>
      <p class="price">${ingredient.price.toFixed(2)} €</p>
    </li>`
  };
}

function renderShippingCost() {
  shippingCost.innerHTML = infoRecipe.shipping.toFixed(2) + ' €'
}


/*Seleccionar y deseleccionar todos los checkbox*/
const selectionButton = document.querySelector('.selection-button');

function togleCheckAll(){
  var checkbox = document.querySelectorAll('.checkbox-list');
  for(let i=0; i<checkbox.length; i++){
    if(checkbox[i].checked) {
      checkbox[i].checked = false;
    } else {
      checkbox[i].checked = true;
    }
  }
}

selectionButton.addEventListener('click', togleCheckAll);
