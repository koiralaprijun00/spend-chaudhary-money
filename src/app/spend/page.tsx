"use client"

import React, { useState, useRef } from "react"
import ProductCard from "../components/ProductCard"
import Header from "../components/Header"
import SocialShare from "../components/SocialShare"
import { initialProducts, Product } from "../data/product"

interface Purchases {
  [key: number]: number
}

export default function Home() {
  const [isModalOpen, setModalOpen] = useState(false)
  const [budget] = useState(237500000000)
  const [spent, setSpent] = useState(0)
  const [purchases, setPurchases] = useState<Purchases>({})

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
      alert("Not enough budget!")
    }
  }

  const handleSell = (product: Product) => {
    if (purchases[product.id] > 0) {
      setSpent(prevSpent => prevSpent - product.price)
      setPurchases(prevPurchases => ({
        ...prevPurchases,
        [product.id]: prevPurchases[product.id] - 1
      }))
    }
  }

  const handleSetQuantity = (product: Product, newQuantity: number) => {
    const currentQuantity = purchases[product.id] || 0
    const difference = newQuantity - currentQuantity

    if (spent + difference * product.price <= budget) {
      setSpent(prevSpent => prevSpent + difference * product.price)
      setPurchases(prevPurchases => ({
        ...prevPurchases,
        [product.id]: newQuantity
      }))
    } else {
      alert("Not enough budget!")
    }
  }

  const totalSpent = Object.entries(purchases).reduce((sum, [key, quantity]) => {
    const product = initialProducts.find(p => p.id === parseInt(key))
    return product ? sum + quantity * product.price : sum
  }, 0)

  return (
    <div className="grid grid-cols-1 md:grid-cols-[2fr,1fr] h-screen gap-4">
      <div className="flex flex-col h-screen">
        <div className="sticky top-0 z-50 bg-white">
          <Header budget={budget} spent={spent} setModalOpen={setModalOpen} isModalOpen={isModalOpen} />
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
      <div className="bg-white p-6  bg-gray-600 bg-opacity-10 rounded-lg shadow sticky top-5 h-screen overflow-y-auto hidden md:block">
        <div className="flex flex-col h-full">
          <SocialShare summaryRef={purchasesRef} totalSpent={totalSpent} />
          <div className="flex flex-col h-full">
            {/* <div className="py-6 px-4 mb-4 border-t rounded-md bg-[#0055a4] text-white"> */}
            <div className="py-6 mb-4 border-b-2 border-gray-600 border-dashed">
            <h2 className="text-2xl mb-8 font-semibold">RECEIPT</h2>
              <p className="flex justify-between text-xl font-bold text-right">
                <span className="block">Total Spent:</span> NPR {totalSpent.toLocaleString()}
              </p>
            </div>
            <div className="overflow-y-auto flex-grow">
              {Object.keys(purchases).length === 0
                ? <p className="text-gray-500">No purchases yet!</p>
                : initialProducts.filter(product => purchases[product.id]).map(product =>
                    <div key={product.id} className="mb-4">
                      <div className="flex justify-between items-center">
                        <div className="font-medium">
                          {product.name}
                        </div>
                        <div className="text-gray-500">
                          x{purchases[product.id]}
                        </div>
                      </div>
                      <div className="text-right mt-1">
                        NPR {(purchases[product.id] * product.price).toLocaleString()}
                      </div>
                      <hr className="my-2 border-gray-300" />
                    </div>
                  )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
