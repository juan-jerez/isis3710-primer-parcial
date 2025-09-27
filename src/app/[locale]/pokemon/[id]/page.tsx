"use client";

import { useEffect, useState } from "react";

interface PokemonDetails {
    name: string;
    height: number;
    weight: number;
    abilities: string[];
    types: string[];
    image: string;
}

const BgColorTypes: { [key: string]: string } = {
    bug: 'bg-[#a8b820]',
    dark: 'bg-[#705848]',
    dragon: 'bg-[#7038f8]',
    electric: 'bg-[#f8d030]',
    fairy: 'bg-[#f0a6f7]',
    fighting: 'bg-[#c03028]',
    fire: 'bg-[#f08030]',
    flying: 'bg-[#a890f0]',
    ghost: 'bg-[#705898]',
    grass: 'bg-[#78c850]',
    ground: 'bg-[#e0c068]',
    ice: 'bg-[#98d8d8]',
    normal: 'bg-[#a8a878]',
    poison: 'bg-[#a040a0]',
    psychic: 'bg-[#f85888]',
    rock: 'bg-[#b8a038]',
    water: 'bg-[#6890f0]',
};

const BorderColorTypes: { [key: string]: string } = {
    bug: 'border-[#a8b820]',
    dark: 'border-[#705848]',
    dragon: 'border-[#7038f8]',
    electric: 'border-[#f8d030]',
    fairy: 'border-[#f0a6f7]',
    fighting: 'border-[#c03028]',
    fire: 'border-[#f08030]',
    flying: 'border-[#a890f0]',
    ghost: 'border-[#705898]',
    grass: 'border-[#78c850]',
    ground: 'border-[#e0c068]',
    ice: 'border-[#98d8d8]',
    normal: 'border-[#a8a878]',
    poison: 'border-[#a040a0]',
    psychic: 'border-[#f85888]',
    rock: 'border-[#b8a038]',
    water: 'border-[#6890f0]',
};

const PokemonDetailPage = ({ params }: { params: Promise<{ id: string }> }) => {
    const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);
    const [id, setId] = useState<string | null>(null);

    useEffect(() => {
        const unwrapParams = async () => {
            const resolvedParams = await params;
            setId(resolvedParams.id);
        };

        unwrapParams();
    }, [params]);

    useEffect(() => {
        const cargarDetallesPokemon = async () => {
            if (!id) return;

            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
                const data = await response.json();
                if (response.ok) {
                    setPokemon({
                        name: data.name,
                        height: data.height * 10, // Convertir a cm
                        weight: data.weight / 10, // Convertir a kg
                        abilities: data.abilities.map((a: { ability: { name: string } }) => a.ability.name),
                        types: data.types.map((t: { type: { name: string } }) => t.type.name),
                        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
                    });
                }
            } catch (error) {
                console.error("Error cargando detalles del Pokémon:", error);
            }
        };

        cargarDetallesPokemon();
    }, [id]);

    if (!pokemon) {
        return <p className="text-center text-xl">Cargando detalles del Pokémon...</p>;
    }

    const mainType = pokemon.types[0]; // Usar el primer tipo como principal para el borde

    return (
        <div className="flex flex-col items-center p-6 min-h-screen bg-[#D9E9FE]">
            <h1 className="text-2xl font-bold text-center mb-4 capitalize">{pokemon.name} - Detalles del Pokémon</h1>
            <div className="flex flex-col md:flex-row items-center gap-6">
                <img 
                    src={pokemon.image}
                    alt={pokemon.name}
                    className={`bg-white border-4 rounded-lg w-64 h-64 object-contain ${BorderColorTypes[mainType] || "border-gray-400"}`}
                />
                <div className="text-lg p-6">
                    <p><strong>Altura:</strong> {pokemon.height} cm</p>
                    <p><strong>Peso:</strong> {pokemon.weight} kg</p>
                    <p><strong>Habilidades:</strong></p>
                    <ul className="list-disc pl-6">
                        {pokemon.abilities.map((ability) => (
                            <li key={ability} className="capitalize">{ability}</li>
                        ))}
                    </ul>
                    <p><strong>Tipos:</strong></p>
                    <div className="flex gap-2 mt-2">
                        {pokemon.types.map((type) => (
                            <span
                                key={type}
                                className={`px-2 py-1 rounded-full text-white capitalize ${BgColorTypes[type] || "bg-gray-200"}`}
                            >
                                {type}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PokemonDetailPage;