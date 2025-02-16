"use client"

import React from "react"

interface FactsModalProps {
  isOpen: boolean
  onClose: () => void
}

const facts = [
  "Feed every Nepali (30 million people) one plate of dal bhat every day for a year.",
  "Buy more than 7,000 apartments in Kathmandu.",
  "Build 42,720 rural schools across Nepal.",
  "Fly to Everest more than 534,000 times by helicopter.",
  "Buy 23,733 Toyota Hilux pickups.",
  "Plant over 42 million trees.",
  "Host 17,800 full-scale Nepali weddings.",
  "Buy over 2.1 million high-quality pashmina shawls."
]

const FactsModal: React.FC<FactsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative bg-white rounded-xl p-8 max-w-2xl w-full shadow-2xl transform transition-all duration-300">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl">
          ✕
        </button>
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">What you can do with the Money</h2>
        <ul className="space-y-4">
          {facts.map((fact, index) =>
            <li key={index} className="flex items-start space-x-4 text-gray-700 text-lg">
              <div className="w-2.5 h-2.5 bg-gray-800 rounded-full mt-2" />
              <span>
                {fact}
              </span>
            </li>
          )}
        </ul>
        <div className="text-center mt-8">
          <button onClick={onClose} className="px-8 py-3 text-white bg-gray-800 rounded-lg text-lg font-medium hover:bg-gray-900 transition">
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default FactsModal
