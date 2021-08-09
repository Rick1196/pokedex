import axios from "axios";
import { PokemonListI } from "../interfaces/pokemonI";

export function getPokemons(limit:number, offset:number):Promise<PokemonListI>{
    return axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`).then(result =>{
        const pokemons = result.data as unknown;
        return pokemons as PokemonListI;
    })
}