import Image from 'next/image';

export default function Header() {
    return (
        <div className="grid place-content-center h-24 bg-[#E71309]">
            <Image src="/pokemon-logo.png" alt="Logo" width={200} height={100} />
        </div>

    );
}
