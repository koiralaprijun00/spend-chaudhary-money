"use client"

import React, { useState } from "react"
import ProductCard from "./components/ProductCard"
import ProgressBar from "./components/ProgressBar"
import Image from "next/image"
import { initialProducts, Product } from "./data/product"

interface Purchases {
  [key: number]: number
}

export default function Home() {
  const [budget, setBudget] = useState(237500000000) // NPR equivalent of $1.78 billion
  const [spent, setSpent] = useState(0)
  const [purchases, setPurchases] = useState<Purchases>({})

  const handleBuy = (product: Product) => {
    if (spent + product.price <= budget) {
      setSpent(spent + product.price)
      setPurchases(prev => ({
        ...prev,
        [product.id]: (prev[product.id] || 0) + 1
      }))
    } else {
      alert("Not enough budget!")
    }
  }

  const handleSell = (product: Product) => {
    if (purchases[product.id] > 0) {
      setSpent(spent - product.price)
      setPurchases(prev => ({
        ...prev,
        [product.id]: prev[product.id] - 1
      }))
    }
  }

  const handleSetQuantity = (product: Product, newQuantity: number) => {
    const difference = newQuantity - (purchases[product.id] || 0)
    if (spent + difference * product.price <= budget) {
      setSpent(spent + difference * product.price)
      setPurchases(prev => ({
        ...prev,
        [product.id]: newQuantity
      }))
    } else {
      alert("Not enough budget!")
    }
  }

  const totalSpent = Object.keys(purchases).reduce((sum, key) => sum + purchases[parseInt(key)] * initialProducts.find(p => p.id === parseInt(key))!.price, 0)

  return (
    <div style={{ display: "flex", flexDirection: "row", padding: "20px" }}>
      <div style={{ flex: 3, marginRight: "20px" }}>
        <div
          style={{
            padding: "20px",
            borderBottom: "2px solid #ddd",
            border: "1px solid rgba(46, 46, 46, 0.1)",
            borderRadius: "8px",
            boxShadow: "0 1px 3px rgba(145, 145, 145, 0.1)",
            marginBottom: "20px",
            display: "flex",
            alignItems: "center"
          }}
        >
          <Image src="/binod-header.jpg" alt="Binod Chaudhary" width={200} height={100} objectFit="cover" className="rounded-lg mr-4" />
          <div>
            <h1 style={{ fontSize: "28px", fontWeight: "bold", color: "#2c3e50", marginBottom: "5px" }}>Spend Binod Chaudhary's Money</h1>
            <p style={{ fontSize: "16px", margin: 0 }}>
              <strong style={{ fontSize: "20px", color: "#0055a4" }}>
                NPR {budget.toLocaleString()}
              </strong>
              <span className="block" style={{ fontSize: "14px", color: "#888" }}>
                (USD ${(budget / 120).toFixed(2).toLocaleString()})
              </span>
            </p>
            <ProgressBar total={budget} spent={spent} />
          </div>
        </div>

        <div className="flex justify-between flex-wrap">
          {initialProducts.map(product =>
            <ProductCard key={product.id} product={product} onBuy={handleBuy} onSell={handleSell} onSetQuantity={handleSetQuantity} quantity={purchases[product.id] || 0} />
          )}
        </div>
      </div>
      <div className="flex-1 p-6 border border-gray-200 rounded-lg w-[300px] sticky top-5 h-screen">
        <h2 className="text-lg font-semibold">YOUR PURCHASES</h2>
        <div className="flex flex-col h-full">
        <div className="py-6 px-4 mb-4 border-t rounded-md" style={{ backgroundColor: "#0055a4", color: "#fff" }}>
            <p className=" text-2xl font-bold text-right">
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
  )
}
