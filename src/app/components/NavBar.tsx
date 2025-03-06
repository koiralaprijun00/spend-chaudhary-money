import Image from "next/image"
import Link from "next/link"
// import { FaTwitter } from "react-icons/fa" // Import the Twitter icon

const Navbar = () => {
  return (
    <nav className="">
      <div className="container flex items-center justify-between md:px-0">
        {" "}{/* Added justify-between back */}
        <Link href="/" className="flex items-center ml-2 mt-2 mb-6 ">
          <Image src="/images/momo.png" alt="Piro Momo Logo" width={40} height={40} className="mr-2" />
          <span className="text-gray-800 dark:text-white text-xl font-bold">Piro Momo</span>
        </Link>
        {/* Right side: Twitter Icon */}
        
        {/* <div className="flex items-center">
          <Link href="https://x.com/kastopiromomo" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="text-gray-400 text-2xl hover:text-gray-800" />
          </Link>
        </div> */}
      </div>
    </nav>
  )
}

export default Navbar
