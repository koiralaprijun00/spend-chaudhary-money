import Link from "next/link"

export default function HomePage() {
  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold">Welcome to Piromomo!</h1>
      <p className="mt-2">This is the homepage for piromomo.com.</p>

      {/* Link to /spend */}
      <Link href="/spend" className="inline-block mt-4 px-4 py-2 bg-blue-500 text-white rounded">
        Go to Spend Page
      </Link>
    </main>
  )
}
