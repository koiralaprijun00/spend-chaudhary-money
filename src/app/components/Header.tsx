// components/Header.js
"use client"

import React, { useState } from "react"
import Image from "next/image"
import ProgressBar from "./ProgressBar"
import FactsModal from "./FactsModal"

interface HeaderProps {
  budget: number
  spent: number
  setModalOpen: (open: boolean) => void
  isModalOpen: boolean
}

const Header: React.FC<HeaderProps> = ({ budget, spent, setModalOpen, isModalOpen }) => {
  return (
    <div className="p-5 border-b-2 bg-white border-gray-300 border border-gray-200 rounded-lg shadow mb-5 flex justify-between">
      <div className="sticky top-0 z-50  p-4 md:static md:top-auto md:z-auto">
        <div className="flex flex-col md:flex-row items-center md:items-start">
          <div className="flex items-center">
            <Image
              src="/binod-header.jpg"
              alt="Binod Chaudhary"
              width={100} // Smaller on mobile
              height={100} // Smaller on mobile
              objectFit="contain"
              className="rounded-lg mr-2 md:mr-4 md:w-[125px] md:h-[125px]" // Larger on medium screens and up
            />
          </div>
          <div className="md:ml-4 text-center md:text-left">
            <h1 className="text-xl font-bold text-gray-800 mb-2 md:text-2xl">Spend Binod Chaudhary's Money</h1>
            <p className="text-base md:text-lg">
              <strong className="text-lg md:text-xl text-blue-600">
                NPR {budget.toLocaleString()}
              </strong>
              <span className="block text-sm text-gray-600">
                (USD ${(budget / 120).toFixed(2).toLocaleString()})
              </span>
            </p>
            <ProgressBar total={budget} spent={spent} />
          </div>
        </div>
      </div>
      <div className="hidden md:block md:w-1/4 text-right">
        <button
          onClick={() => setModalOpen(true)}
          className="text-sm underline text-blue-600 bg-transparent px-4 py-2 rounded-md hover:bg-gray-100"
        >
          Check Some Facts
        </button>
        <FactsModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
      </div>
    </div>
  )
}

export default Header
