const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');
const recipeContainer = document.querySelector('.recipe-container');
const recipeDetailsContent = document.querySelector('.recipe-details-content');
const recipeCloseBtn = document.querySelector('.recipe-closeBtn');
// function to get recipes 
const fetchRecipes = async(query) => {
    recipeContainer.innerHTML="<h2>Fetching Recipes...</h2>";
    try{
  const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
  const response = await data.json();
  recipeContainer.innerHTML="";
  
  response.meals.forEach(meal =>{
    const recipeDiv = document.createElement('div');
    recipeDiv.classList.add('recipe');
    recipeDiv.innerHTML= `
    <img src="${meal.strMealThumb}">
    <h3>${meal.strMeal}</h3>
    <p><span>${meal.strArea }</span> Dish</p>
    <p>Belongs to<span>${meal.strCategory}</span>Category</p>
    `
    const button = document.createElement('button');
    button.textContent ="view Recipe";
    /* agar ye property lagayege toh p tag ke baad button ayega */
    recipeDiv.appendChild(button);
   // Adding addEventListener to recipe button
  button.addEventListener(  'click',() => {
    openRecipePopup(meal);
   }
  );

    recipeContainer.appendChild(recipeDiv);
  }
    );
  }
    catch (error){
      recipeContainer.innerHTML = "<h2> ERROR in FetchingRecipes...</h2>";
    
}
}
//open pop function
const fetchIngredients = (meal) =>{
    let ingredientsList = "";
   for(let i=1;i<=20;i++){
        const ingredient = meal[`strIngredient${i}`];
        if(ingredient){
            const measure = meal[`strMeasure${i}`];
            //+ isliye lagana hai ki h pue=rane ingredient overrite nhi hoge
            ingredientsList += `<li>${measure} ${ingredient}</li>`
        }
        else {
            break;
        }
    }
    return ingredientsList;

}
const openRecipePopup = (meal)=>{
    recipeDetailsContent.innerHTML= `
    <h2 class="recipeName">${meal.strMeal} </h2>
    <h3>Ingredents:</h3>
       <ul class="ingredientList">${fetchIngredients(meal)}</ul>
    <div>
<h3>Instructions:</h3>
<p class="recipeinstructions">${meal.strInstructions}</p>
</div>
   `
    recipeDetailsContent.parentElement.style.display="block";

}
recipeCloseBtn.addEventListener('click',()=>{
  recipeDetailsContent.parentElement.style.display = "none";
});


searchBtn.addEventListener('click', (e) => {
  // Prevent the default form submission behavior
  e.preventDefault();

  // Get the value of the search input and remove leading/trailing whitespace
  const searchInput = searchBox.value.trim();
  //agar search input nhi hai toh random kuch nhi ayega
  if(!searchInput){
    recipeContainer.innerHTML=`<h2>Type the meal in the search box </h2>`;
    return;

  }

  // Call fetchRecipes function with the search input value
  fetchRecipes(searchInput);
});    
