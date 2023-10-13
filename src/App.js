import './App.css';
import { useState } from 'react';

function App() {

  const { pokemonName, setPokemonName } = useState('')

  return (
    <div className="App">
      <div className='header-container'>
        <h1>Pokemon Dexter</h1>
        <input placeholder='Search Pokemon' onChange={(event) => {setPokemonName(event.target.value)}}></input>
        <button className='submit-search'>Submit</button>
      </div>
      
    </div>
  );
}

export default App;
