"use client"

import React, { useState, useRef } from "react"
import ProductCard from "../../components/ProductCard"
import Header from "../../components/Header"
import SocialShare from "../../components/SocialShare"
import { initialProducts, Product } from "../../data/product"
import GameButton from "../../components/ui/GameButton"

interface Purchases {
  [key: number]: number
}

export default function Home() {
  const [isModalOpen, setModalOpen] = useState(false)
  const [budget] = useState(237500000000)
  const [spent, setSpent] = useState(0)
  const [purchases, setPurchases] = useState<Purchases>({})
  const [isReceiptModalOpen, setReceiptModalOpen] = useState(false)

  // Ref for the purchases summary area
  const purchasesRef = useRef<HTMLDivElement>(null)

  const handleBuy = (product: Product) => {
    if (spent + product.price <= budget) {
      setSpent(prevSpent => prevSpent + product.price)
      setPurchases(prevPurchases => ({
        ...prevPurchases,
        [product.id]: (prevPurchases[product.id] || 0) + 1
      }))
    } else {
      alert("Binod doesnt have enough Money! He is not Elon Musk.")
    }
  }

  const handleSell = (product: Product) => {
    if (purchases[product.id] > 0) {
      setSpent(prevSpent => prevSpent - product.price)
      setPurchases(prevPurchases => ({
        ...prevPurchases,
        [product.id]: Math.max(prevPurchases[product.id] - 1, 0)
      }))
    }
  }

  const handleSetQuantity = (product: Product, newQuantity: number) => {
    const currentQuantity = purchases[product.id] || 0
    const difference = newQuantity - currentQuantity
    const newSpent = spent + difference * product.price

    if (newSpent <= budget && newQuantity >= 0) {
      setSpent(newSpent)
      setPurchases(prevPurchases => ({
        ...prevPurchases,
        [product.id]: newQuantity
      }))
    } else {
      alert("Binod doesnt have enough Money! He is not Elon Musk.")
    }
  }

  const totalSpent = spent

  return (
    <div className="grid grid-cols-1 md:grid-cols-[2fr,1fr] h-screen px-1 md:px-16 gap-4 py-0">
      <div className="flex flex-col h-screen">
        <div className="sticky top-0 z-50 bg-white">
          <Header budget={budget} spent={spent} setModalOpen={setModalOpen} isModalOpen={isModalOpen} />
        </div>
        {/* Accessibility: Live Message for Budget Exceeded */}
        <div aria-live="polite" className="sr-only">
          {spent > budget ? "Binod doesn't have enough money! He is not Elon Musk." : ""}
        </div>

        <div
          className="grid gap-4 mt-4 pb-12 p overflow-y-auto flex-grow"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))"
          }}
        >
          {initialProducts.map(product =>
            <ProductCard key={product.id} product={product} onBuy={handleBuy} onSell={handleSell} onSetQuantity={handleSetQuantity} quantity={purchases[product.id] || 0} />
          )}
        </div>
      </div>
      <div className="md:block hidden p-6 bg-white rounded-lg shadow-lg sticky top-5 h-screen overflow-y-auto">
        <div className="flex flex-col h-full">
          <SocialShare summaryRef={purchasesRef} totalSpent={totalSpent} />
          <div className="flex flex-col h-full">
            <div className="py-6 mb-4 border-b-2 border-gray-600 border-dashed">
              <h1 className="text-3xl mb-4 font-bold text-left bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-red-500">
                Receipt
              </h1>
              <p className="flex justify-between text-xl font-bold text-right">
                <span className="block text-gray-600">Total Spent:</span> 
                <span className="text-blue-600">NPR {totalSpent.toLocaleString()}</span>
              </p>
            </div>
            <div className="overflow-y-auto flex-grow max-h-screen">
              {Object.keys(purchases).length === 0
                ? <p className="text-gray-500">No purchases yet!</p>
                : initialProducts.filter(product => purchases[product.id]).map(product =>
                    <div key={product.id} className="mb-4 p-3 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div className="font-medium text-gray-800">
                          {product.name}
                        </div>
                        <div className="text-gray-500">
                          x{purchases[product.id]}
                        </div>
                      </div>
                      <div className="text-right mt-1 text-blue-600 font-bold">
                        NPR {(purchases[product.id] * product.price).toLocaleString()}
                      </div>
                    </div>
                  )}
            </div>
          </div>
        </div>
      </div>
      <GameButton
        onClick={() => setReceiptModalOpen(true)}
        type="neutral"
        className="fixed bottom-4 right-4 md:hidden shadow-lg"
      >
        View Receipt
      </GameButton>

      {isReceiptModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-6">
          <div className="bg-gradient-to-br from-blue-600 to-red-500 p-1 rounded-xl shadow-lg w-full max-w-md">
            <div className="bg-white rounded-lg p-6 relative">
              <button
                onClick={() => setReceiptModalOpen(false)}
                className="absolute top-4 right-5 text-gray-500 hover:bg-gray-200 px-2 py-2 rounded-full focus:outline-none transition-colors"
              >
                X
              </button>
              <div className="py-6 mb-4 border-b-2 border-gray-600 border-dashed">
                <h1 className="text-3xl mb-4 font-bold text-left bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-red-500">
                  Receipt
                </h1>
                <p className="flex justify-between text-xl font-bold text-right">
                  <span className="block text-gray-60">Total Spent:</span> 
                  <span className="text-blue-600">NPR {totalSpent.toLocaleString()}</span>
                </p>
              </div>
              <div className="overflow-y-auto max-h-[60vh]">
                {Object.keys(purchases).length === 0 ? (
                  <p className="text-gray-500">No purchases yet!</p>
                ) : (
                  initialProducts
                    .filter((product) => purchases[product.id])
                    .map((product) => (
                      <div key={product.id} className="mb-4 p-3 bg-gray-50 rounded-lg">
                        <div className="flex justify-between items-center">
                          <div className="font-medium text-gray-800">{product.name}</div>
                          <div className="text-gray-500">x{purchases[product.id]}</div>
                        </div>
                        <div className="text-right mt-1 text-blue-600 font-bold">
                          NPR {(purchases[product.id] * product.price).toLocaleString()}
                        </div>
                      </div>
                    ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}