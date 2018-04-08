'use strict'

/*Obtener y pintar la info*/
let infoRecipe = {};
const JSON_RECIPE = 'https://raw.githubusercontent.com/Adalab/recipes-data/master/rissoto-setas.json';
const pageTitle = document.querySelector('.page-title');
const ingredientList = document.querySelector('.ingredient-list');
const shippingCost = document.querySelector('.shipping-cost');
const checkboxList = document.querySelectorAll('.checkbox-list');
let subtotalCost = document.querySelector('.subtotal-cost');
let totalCost = document.querySelector('.total-cost');
const totalCostButton = document.querySelector('.total-button');
let totalPriceCounter = 0;
let totalCostCounter = 0;

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
    listenerEvents();
  });
}

window.onload = getInfo;

function renderTitle() {
pageTitle.innerHTML = infoRecipe.name;
}

function renderIngredientList() {
  for (const ingredient of infoRecipe.ingredients) {
    ingredientList.innerHTML += `<li class="ingredient-item">
      <input class="checkbox-list" id="checkbox" type="checkbox" name="ingredient-checkbox" value=${ingredient.price.toFixed(2)}>
      <input type="text" name="ingredient-quantity" class="items" value=${ingredient.items}></input>
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

/*Actualizar contadores cuando selecciono ingredientes*/
 function getTotalPrice(event) {
   totalPriceCounter += parseFloat(event.target.value);
   subtotalCost.innerHTML = totalPriceCounter.toFixed(2) + ' €';
   totalCostCounter = (totalPriceCounter + parseFloat(infoRecipe.shipping)).toFixed(2) + ' €';
   totalCost.innerHTML = totalCostCounter;
   totalCostButton.innerHTML = 'Comprar ingredientes: ' + totalCostCounter;
  }


 function listenerEvents() {
		let checkBoxList = document.querySelectorAll('.checkbox-list');
		checkBoxList.forEach(function(checkbox){
			checkbox.addEventListener('click', getTotalPrice);
		});
 }



/*Seleccionar y deseleccionar todos los checkbox*/
const selectionButton = document.querySelector('.selection-button');
const noSelectionButton = document.querySelector('.noselection-button');

function CheckAll(){
  const checkbox = document.querySelectorAll('.checkbox-list');
  for(let i=0; i<checkbox.length; i++){
      checkbox[i].checked = true;
      totalPriceCounter += parseFloat(checkbox[i].value);
      subtotalCost.innerHTML = totalPriceCounter.toFixed(2) + ' €';
      totalCostCounter = (totalPriceCounter + parseFloat(infoRecipe.shipping)).toFixed(2) + ' €';
      totalCost.innerHTML = totalCostCounter;
      totalCostButton.innerHTML = 'Comprar ingredientes: ' + totalCostCounter;
    }
}

function unCheckAll(){
  const checkbox = document.querySelectorAll('.checkbox-list');
  for(let i=0; i<checkbox.length; i++){
      checkbox[i].checked = false;
      totalPriceCounter = 0;
      subtotalCost.innerHTML = totalPriceCounter.toFixed(2) + ' €';
      totalCostCounter = 0;
      totalCost.innerHTML = totalCostCounter.toFixed(2) + ' €';
      totalCostButton.innerHTML = 'Comprar ingredientes: ' + totalCostCounter;
    }
}

selectionButton.addEventListener('click', CheckAll);
noSelectionButton.addEventListener('click', unCheckAll);
