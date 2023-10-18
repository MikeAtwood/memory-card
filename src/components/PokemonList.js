import { useState, useEffect } from "react"
import axios from "axios"

const PokemonList = ({ onPokemonClick }) => {
    const [ pokemonDex, setPokemonDex ] = useState([])

    useEffect(() => {
        const fetchPokemonList = async () => {
            try {
                const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=150")
                const pokemonList = response.data.results;

                const pokemonDetails = await Promise.all(
                    pokemonList.map(async (pokemon) => {
                        const res = await axios.get(pokemon.url)
                        return {
                            name: pokemon.name,
                            species: res.data.species.name,
                            img: res.data.sprites.front_default,
                            hp: res.data.stats[0].base_stat,
                            attack: res.data.stats[1].base_stat,
                            defense: res.data.stats[2].base_stat,
                            type: res.data.types[0].type.name,
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

    const handleClick = (pokemon) => {
        onPokemonClick(pokemon)
    }

    return (
        <div className="pokemon-list">
            <h1>POKEDEX</h1>
            <div className="pokedex-container">
                {pokemonDex.map((pokemon) => (
                    <div key={pokemon.name} className="pokemon-box" onClick={() => handleClick(pokemon)}>
                        <img src={pokemon.img} alt={pokemon.name} />
                        <p>{pokemon.name}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PokemonList