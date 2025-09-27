import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="flex justify-between items-center h-24 bg-[#11463B] text-white px-6">
        <span className="text-muted">© 2025 PokeApp. Todos los derechos reservados</span>
        <span className="text-muted">Desarrollado para ISIS3710</span>
      </div>
    </footer>
  );
}