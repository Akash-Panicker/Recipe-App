import logo from './logo.svg';
import './App.css';
import Recipe from './Recipe';
import React, { useEffect, useState } from "react";

// Import environment variables
const APP_ID = process.env.REACT_APP_ID;
const APP_KEY = process.env.REACT_APP_KEY;

console.log(APP_ID)
const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');

  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);

    const data = await response.json();
    console.log(data);
    setRecipes(data.hits);
  }

  const updateSearch = e => {
    setSearch(e.target.value);
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
  }

  return (
    <div className="App">
      <br />
      <h1 className='heading-top'>Welcome to the Recipe App</h1><br />
      <form onSubmit={getSearch} className="search-form">
        <input className='search-bar' type='text' value={search} onChange={updateSearch} />
        <button className='search-button' type="submit"> Search</button>
      </form>
      <div className='innerform'>
        {recipes.map(recipe => (
          <Recipe
            key={recipe.recipe.label}
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
