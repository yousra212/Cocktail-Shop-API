window.onload = function() { 
    const drinks = [
        { name: "Hugo", price: 5, color: "#ffcccc", isCocktail:true, type: "cocktail" },
        { name: "Martini", price: 7, color: "#ffb3ec", isCocktail:true, type: "cocktail" },
        { name: "Margarita", price: 7,color: "#b3e6ff", isCocktail:true, type: "cocktail" },
        { name: "Manhattan", price: 9, color: "#b3ffcc", isCocktail:true, type: "cocktail" },
        { name: "Earl Grey tea", price: 2, color: "#ffd699", isCocktail:false, type: "tea" },
        { name: "Herbal tea", price: 2, color: "#ffff99", isCocktail:false, type: "tea" },
        { name: "Ginger ale", price: 3, color: "#d699ff", isCocktail:false, type: "softdrink" },
        { name: "Lemonade", price: 3, color: "#ccccb3", isCocktail:false, type: "softdrink" }
      ]; 

const container = document.querySelector("#button-container");
      
drinks.forEach(drink => {
    const buttonDrink = document.createElement("button");
    buttonDrink.innerText = `${drink.name} €${drink.price}`;
    buttonDrink.style.backgroundColor = drink.color;
    buttonDrink.addEventListener("click", () => {
        if (drink.isCocktail) {
            console.log(`${drink.name} is a cocktail`);
        } else {
            console.log(`${drink.name} is not a cocktail`);
        }
    });
    buttonDrink.addEventListener("click", () => showInstructions(drink));
    container.appendChild(buttonDrink);
});

let drinkList = [];
let totalPrice = 0;

const showInstructions = drink => {
  const result = document.querySelector("#result");
  result.innerHTML = "";

  if (drink.type === "softdrink") {
    result.innerHTML = "<p>Just pour the drink, and you're ready to go!</p>";
    DrinkListAndTotalPrice(drink);
  } else if (drink.type === "tea") {
    result.innerHTML = 
    `<p>Put the kettle on</p>
      <p>Get a teaspoon of tea in your cup</p>
      <p>Pour the water and wait for a couple of minutes</p>
      <p>Enjoy the perfect tea!</p>`;
    DrinkListAndTotalPrice(drink);
  } else if (drink.type === "cocktail") {
    const searchTerm = encodeURI(drink.name);
    const apiUrl = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        if (!data.drinks || !data.drinks.length) {
            result.innerHTML = "<p>Sorry, no instructions available for this cocktail.</p>";
            DrinkListAndTotalPrice(drink);
            return;
          }
        const cocktail = data.drinks[0];
        if (cocktail) {
          const instructions = cocktail.strInstructions;
          const imageUrl = cocktail.strDrinkThumb;
          result.innerHTML = 
          `<img src="${imageUrl}" alt="${drink.name}" />
            <p>${instructions}</p>`;
          DrinkListAndTotalPrice(drink);
        } 
      });
  };
};

const DrinkListAndTotalPrice = drink => {
  drinkList.push({name: drink.name, price: drink.price});
  totalPrice += drink.price;
  DrinkList();
  TotalPrice();
};

const DrinkList = () => {
  const drinkListElement = document.querySelector("#drink-list");
  drinkListElement.innerHTML = "";
  for (const drink of drinkList){
    drinkListElement.innerHTML += `<li>${drink.name}: €${drink.price}</li>`;
  }
};

const TotalPrice = () => {
  const totalPriceElement = document.querySelector("#total-price");
  totalPriceElement.innerHTML = `Total Price: €${totalPrice}`;
};
};



  