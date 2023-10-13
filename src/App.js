import './App.css';
import { useState } from 'react';
import Axios from 'axios';

function App() {

  const [ pokemonName, setPokemonName ] = useState("")

  const searchPokemon = () => {
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then((response)=> {
      console.log(response)
    })
  }

  return (
    <div className="App">
      <div className='header-container'>
        <h1>Pokemon Dexter</h1>
        <input type='text' 
          placeholder='Search Pokemon' 
          onChange={(event) => {
            setPokemonName(event.target.value)
          }}
        />
        <button onClick={searchPokemon} className='submit-search'>Submit</button>
      </div>
    </div>
  );
}

export default App;
