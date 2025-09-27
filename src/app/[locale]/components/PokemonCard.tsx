import Link from "next/link";

interface PokemonCardProps {
    id: string;
    name: string;
    type: string;
    image: string;
}

// Colores del Background para Tailwind
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

// Colores del Border para Tailwind
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

export default function PokemonCard({ id, name, type, image }: PokemonCardProps) {
    const bgColorClass = BgColorTypes[type] || 'bg-gray-200';
    const borderColorClass = BorderColorTypes[type] || 'border-gray-400';
    const link = `/pokemon/${id}`; // Enlace a la página de detalles del Pokémon

    return (
        <Link href={link}>
        <div className={`card border-4 p-4 rounded-lg shadow-md bg-white ${borderColorClass}`}>
            <img src={image} alt={name} className="w-full h-32 object-contain mb-4" />
            <h2 className="text-lg font-bold text-center capitalize">{name}</h2>
            <p className={`text-center capitalize px-2 py-1 mt-2 rounded-full text-white ${bgColorClass}`}>
                {type}
            </p>
        </div>
        </Link>
    );
}