"use client";

import { useState, useEffect } from "react";
import PokemonCard from "../components/PokemonCard";

interface Pokemon {
    id: string; // ID del Pokémon (número en la Pokédex)
    name: string;
    type: string;
    image: string;
}

const cargarPokemon = async (setPokemon: React.Dispatch<React.SetStateAction<Pokemon[]>>) => {
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=15');
        const data = await response.json();
        if (response.ok) {
            // Transformar los datos para que coincidan con la interfaz Pokemon
            const pokemonList = await Promise.all(
                data.results.map(async (p: { name: string; url: string }) => {
                    const idPoke = p.url.split('/').filter(Boolean).pop(); // Extraer el ID del Pokémon
                    const res = await fetch(p.url);
                    const details = await res.json();
                    return {
                        id: idPoke, // Agregar el ID del Pokémon
                        name: details.name,
                        type: details.types[0].type.name,
                        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${idPoke}.png`,
                    };
                })
            );
            setPokemon(pokemonList);
        }
    } catch (error) {
        console.error('Error fetching Pokémon data:', error);
    }
};

const PokemonPage = () => {
    const [pokemon, setPokemon] = useState<Pokemon[]>([]);

    // Llamar a cargarPokemon cuando el componente se monte
    useEffect(() => {
        cargarPokemon(setPokemon);
    }, []);

    return (
        <div className="grid grid-cols-3 gap-4 p-4 min-h-screen bg-[#D9E9FE]">
            <h1 className="col-span-3 text-black text-center text-2xl mb-4">Lista de Pokémons</h1>
            {pokemon.map((p) => (
                <PokemonCard key={p.id} id={p.id} name={p.name} type={p.type} image={p.image} />
            ))}
        </div>
    );
};

export default PokemonPage;