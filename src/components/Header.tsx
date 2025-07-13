import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600 hover:text-blue-800 transition">
          ClearNote AI
        </Link>
        <nav className="space-x-6 text-gray-700">
          <Link href="/" className="hover:text-blue-500">Home</Link>
          <Link href="/summarize" className="hover:text-blue-500">Summarize</Link>
          <Link href="/about" className="hover:text-blue-500">About</Link>
        </nav>
      </div>
    </header>
  );
}
