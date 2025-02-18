'use client'

import React from "react"
import Image from "next/image"
import ProgressBar from "./ProgressBar"
import FactsModal from "./FactsModal"
import AdComponent from "./AdComponent"

interface HeaderProps {
  budget: number
  spent: number
  setModalOpen: (open: boolean) => void
  isModalOpen: boolean
}

const Header: React.FC<HeaderProps> = ({ budget, spent, setModalOpen, isModalOpen }) => {
  return (
    <>
    <div className=" p-5 border-b-2  border-gray-300 border border-gray-200 rounded-lg shadow flex flex-row md:justify-between justify-center">
      <div className="sticky top-0 z-50  md:static md:top-auto md:z-auto">
        <div className="flex flex-col md:flex-col items-center md:items-start">
          {/* ------- */}
          <div className="flex md:flex-row">
            <div className="flex items-center">
              <Image
                src="/binod-header.jpg"
                alt="Binod Chaudhary"
                width={100} // Smaller on mobile
                height={100} // Smaller on mobile
                objectFit="contain"
                className="rounded-lg md:w-[125px] md:h-[125px]" // Larger on medium screens and up
              />
            </div>

            <div className="text-center md:text-left ml-2 md:ml-4 flex flex-col justify-start items-start">
              <h1 className="text-xl font-bold text-gray-800 mb-2 md:text-2xl">Spend Binod Chaudhary's Money</h1>
              <p className="text-base md:text-lg">
                <strong className="text-lg md:text-xl text-blue-600">
                  NPR {budget.toLocaleString()}
                </strong>
                <span className="block text-sm text-gray-600 text-left">
                  (USD ${(budget / 120).toFixed(2).toLocaleString()})
                </span>
              </p>
            </div>
          </div>
          {/* ------- */}

          <ProgressBar total={budget} spent={spent} />
        </div>
      </div>
      <div className="hidden md:block md:w-1/4 text-right">
        <button onClick={() => setModalOpen(true)} className="text-sm underline text-blue-600 bg-transparent px-4 py-2 rounded-md hover:bg-gray-100">
          Check Some Facts
        </button>
        <FactsModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
      </div>
    </div>
    <AdComponent />
</>
  )
}

export default Header
