import { useState, useEffect } from "react"
import axios from "axios"

const PokemonList = () => {
    const [ pokemonDex, setPokemonDex ] = useState([])

    useEffect(() => {
        const fetchPokemonList = async () => {
            try {
                const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=100")
                setPokemonDex(response.data.results)
            } catch (error) {
                console.log("Error fetching Pokemon List")
            }
        }
        fetchPokemonList()
    }, [])

    return (
        <div className="pokemon-list">
            <h1>POKEDEX</h1>
            <div className="pokedex-container">
                {pokemonDex.map((pokemon) => (
                    <div key={pokemon.name} className="pokemon-box">
                        <img src={`https://pokeapi.co/media/sprites/pokemon/${pokemon.id}.png`} alt={pokemon.name} />
                        <p>{pokemon.name}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PokemonList