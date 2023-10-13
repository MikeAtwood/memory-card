import './App.css';
import { useState } from 'react';
import Axios from 'axios';

function App() {

  const [ pokemonName, setPokemonName ] = useState("")
  const [ pokemonChosen, setPokemonChosen ] = useState(false)
  const [ pokemon, setPokemon ] = useState({
    name: pokemonName, 
        species: "", 
        image: "", 
        hp: "",
        attack: "",
        defense: "",
        type: "",
  })

  const searchPokemon = () => {
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then((response)=> {
      setPokemon({
        name: pokemonName, 
        species: response.data.species, 
        image: response.data.sprites.front_default, 
        hp: response.data.stats[0].base_stat,
        attack: response.data.stats[1].base_stat,
        defense: response.data.stats[2].base_stat,
        type: response.data.types[0].type.name,
      })
      setPokemonChosen(true)
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
      <div className='DisplaySection'>
          {!pokemonChosen ? (<h1> Please choose a Pokemon</h1>) : (<h1>{pokemonName}</h1>)}
      </div>
    </div>
  );
}

export default App;
