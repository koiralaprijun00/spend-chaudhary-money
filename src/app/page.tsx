import Link from "next/link"
import Image from "next/image"

export default function HomePage() {
  return (
    <main className="flex flex-col items-center">
      {/* Header Section */}
      <div className="p-4 flex flex-col items-center">
        <Image src="/images/momo-header.png" alt="Piromomo Logo" width={140} height={140} className="mb-4" />
        <h1 className="text-2xl sm:text-3xl font-bold text-center">Welcome to Piromomo!</h1>
        <p className="mt-2 text-center text-base sm:text-lg">Fun stuffs are coming!</p>
      </div>

      {/* Card Section */}
      <div className="w-full px-4 sm:w-3/4 md:w-[45%] self-start">
        <Link href="/spend" className="block">
          <div className="relative px-6 py-16 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 mr-4">
                <span className="text-white text-2xl">$</span>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Spend Binod Chaudhary's Money</h2>
              </div>
            </div>
            {/* Hide Binod image on mobile (screens below the "sm" breakpoint) */}
            <Image src="/binod-transparent.png" alt="Binod" width={100} height={100} className="hidden sm:block absolute bottom-0 right-0" />
          </div>
        </Link>
      </div>
    </main>
  )
}
