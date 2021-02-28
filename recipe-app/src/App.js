
import React, {useEffect, useState} from "react";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import Recipe from "./Recipe";
import "./App.css"

function App() {

  // bad practice, but this is API is free
  const API_ID = "2ee0d351";
  const API_KEY = "50aa7b543fca6b66c85b35686ffe11af";
  const urlPrefix = "https://api.edamam.com/search?";
  const [search, setSearch] = useState("");
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    console.log("effect");
  }, [])

  async function getRecipes(e) {
    e.preventDefault();
    try {
      const response = await axios.get(getRequestString());
      console.log(response);
      setRecipes(response.data.hits);
      console.log(recipes);
    } catch(error) {
      console.log(error);
    }
  }

  function updateSearch(e) {
    e.preventDefault();
    setSearch(e.target.value);
  }

  function getRequestString() {
    return (
    `${urlPrefix}q=${search}&app_id=${API_ID}&app_key=${API_KEY}`
    );
  }

  return (
    <div className="App" >
      <form onSubmit={getRecipes} className="search-form">
        <input
          className="search-bar"
          value={search}
          onChange={updateSearch}
        ></input>
        <button className="search-button" type="submit">
          search
        </button>
      </form>
      <div className="recipes">
        {recipes.map(recipe => (
          <Recipe
            key={uuidv4()}
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredientLines}
            link={recipe.recipe.url}
          />
        ))}
      </div>
    </div>
  )
}

export default App;
