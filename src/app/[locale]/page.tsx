import {useTranslations} from 'next-intl';
import Link from 'next/link';
export default function Home() {
  const t = useTranslations('HomePage');
  return (
    <div className ="bg-[#D9E9FE] text-black p-4 text-center">
      <Link href="/pokemon">
        <button style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer"}}>
          Ir a Pokemons
        </button>
      </Link>
    </div>
  );
}
