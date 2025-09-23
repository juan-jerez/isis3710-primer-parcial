"use client";

import { useState } from "react";
import PokemonCard from "../components/PokemonCard";


interface Pokemon {
    name: string;
    type: string;
    image: string;
}

const cargarPokemon = async (setPokemon: React.Dispatch<React.SetStateAction<Pokemon[]>>) => {
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=15')
        const data = await response.json();
        if (response.ok) {
            setPokemon(data);
        }
    } catch (error) {
        console.error('Error fetching Pokémon data:', error);
    }
};


const PokemonPage = () => {
    const [pokemon, setPokemon] = useState<Pokemon[]>([]);

    return (
        <div className ="grid grid-cols-3 gap-4 p-4 bg-cyan-200 min-h-screen">
            <h1 className = "col-span-3 text-Black text-center text-2xl mb-4">lista de pokemons</h1>
            {pokemon.map((p) => (
                <PokemonCard key={p.name} />
            ))}
        </div>
    );
};

export default PokemonPage;
