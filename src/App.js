import logo from './logo.svg';
import './App.css';
import Recipe from './Recipe';
import React, { useEffect, useState } from "react";
// APP_ID and APP_KEY hidden from public for privacy reasons. Please create your own at their site.

const App = () => {



  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('')
  useEffect(() => {
    getRecipes();
  }, [query]);
  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)

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
