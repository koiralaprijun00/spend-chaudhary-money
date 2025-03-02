import Image from "next/image"
import Link from "next/link"
import { FaTwitter } from "react-icons/fa" // Import the Twitter icon

const Navbar = () => {
  return (
    <nav className="py-4 px-4 md:px-0">
      <div className="container mx-auto flex items-center justify-between">
        {" "}{/* Added justify-between back */}
        <Link href="/" className="flex items-center">
          <Image src="/images/momo.png" alt="Piro Momo Logo" width={40} height={40} className="mr-2" />
          <span className="text-gray-800 dark:text-white text-xl font-bold">Piro Momo</span>
        </Link>
        {/* Right side: Twitter Icon */}
        <div className="flex items-center">
          {" "}{/* Added a div for alignment */}
          <Link href="https://x.com/kastopiromomo" target="_blank" rel="noopener noreferrer">
            {" "}{/* Replace with your Twitter link */}
            <FaTwitter className="text-gray-400 text-2xl hover:text-gray-800" />
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
