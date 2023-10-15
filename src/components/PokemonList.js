import { useState, useEffect } from "react"
import axios from "axios"

const PokemonList = () => {
    const [ pokemonDex, setPokemonDex ] = useState([])

    useEffect(() => {
        const fetchPokemonList = async () => {
            try {
                const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=100")
                const pokemonList = response.data.results;

                const pokemonDetails = await Promise.all(
                    pokemonList.map(async (pokemon) => {
                        const res = await axios.get(pokemon.url)
                        return {
                            name: pokemon.name,
                            id: res.data.id,
                            sprite: res.data.sprites.front_default,
                        }
                    })
                )
                setPokemonDex(pokemonDetails)
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
                        <img src={pokemon.sprite} alt={pokemon.name} />
                        <p>{pokemon.name}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PokemonList