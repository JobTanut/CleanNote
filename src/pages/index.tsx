import Head from 'next/head';
import Header from "../components/header";
import Link from 'next/link';

<Link href="/summarize/">
  <span>Summarize</span>
</Link>

export default function Home() {
  return (
    <>
      <Head>
        <title>ClearNote AI</title>
        <meta name="description" content="We clean, you create. Summarize messy notes into clean content." />
      </Head>
      <Header />

      <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-white to-blue-50 px-4 text-center">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-6 hover:text-blue-600 transition">
          We Clean, You Create ✨
        </h1>
        <p className="text-lg text-gray-600 max-w-xl mb-8">
          Turn messy notes into clear, usable content — summaries, blogs, newsletters & more.
        </p>
        <a
          href="/summarize"
          className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium shadow hover:bg-blue-700 hover:scale-105 transition"
        >
          Try it Free
        </a>
      </main>
    </>
  );
}
