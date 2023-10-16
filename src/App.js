import './App.css';
import { useState } from 'react';
import Axios from 'axios';
import PokemonList from './components/PokemonList';

function App() {

  const [ pokemonName, setPokemonName ] = useState("")
  const [ pokemonChosen, setPokemonChosen ] = useState(false)
  const [ pokemon, setPokemon ] = useState({
        name: "", 
        species: "", 
        img: "", 
        hp: "",
        attack: "",
        defense: "",
        type: "",
  })

  const searchPokemon = () => {
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then((response)=> {
      setPokemon({
        name: pokemonName, 
        species: response.data.species.name, 
        img: response.data.sprites.front_default, 
        hp: response.data.stats[0].base_stat,
        attack: response.data.stats[1].base_stat,
        defense: response.data.stats[2].base_stat,
        type: response.data.types[0].type.name,
      })
      setPokemonChosen(true)
    }) 
  }

  const handlePokemonClick = (clickedPokemon) => {
      setPokemon({
        name: clickedPokemon.name,
        species: clickedPokemon.species,
        img: clickedPokemon.img,
        hp: clickedPokemon.hp,
        attack: clickedPokemon.attack,
        defense: clickedPokemon.defense,
        type: clickedPokemon.type,
      })
      setPokemonChosen(true)
  }

  return (
    <div className="App">
      <div className='main-container'>
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
            {!pokemonChosen ? (
            <h1> Please choose a Pokemon</h1>
            ) : (
              <>
                <h1>{pokemon.name}</h1>
                <img src={pokemon.img} alt='pokemon img' />
                <h3>Species: {pokemon.species}</h3>
                <h3>Type: {pokemon.type}</h3>
                <h3>HP: {pokemon.hp}</h3>
                <h3>Attack: {pokemon.attack}</h3>
                <h3>Defense: {pokemon.defense}</h3>
              </>
            )}
        </div>
        <PokemonList onPokemonClick={handlePokemonClick} />
      </div>
    </div>
  );
}

export default App;
