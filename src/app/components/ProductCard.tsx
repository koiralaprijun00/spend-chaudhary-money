import React from "react"
import Image from "next/image"
import { Product } from "../data/product"

interface ProductCardProps {
  product: Product
  quantity: number
  onBuy: (product: Product) => void
  onSell: (product: Product) => void
  onSetQuantity: (product: Product, quantity: number) => void
}

const ProductCard: React.FC<ProductCardProps> = ({ product, quantity, onBuy, onSell, onSetQuantity }) => {
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(0, Number(e.target.value))
    onSetQuantity(product, value)
  }

  return (
    <div className="border rounded p-4 m-2 transition-transform duration-300 hover:scale-105 grid grid-rows-[auto,1fr,auto] gap-4">
      {/* Image Section */}
      <div className="relative h-48 rounded-xl overflow-hidden">
        {product.image
          ? <Image src={product.image} alt={product.name} layout="fill" objectFit="cover" placeholder="blur" blurDataURL="/default-placeholder.png" className="rounded-xl" />
          : <div className="absolute inset-0 flex items-center justify-center text-gray-400">No Image Available</div>}
      </div>

      {/* Details Section */}
      <div>
        <h3 className="text-lg font-semibold">
          {product.name}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-3">
          {product.description}
        </p>
        <p className="text-base font-medium">
          NPR {product.price.toLocaleString()}
        </p>
      </div>

      {/* Action Section */}
      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={() => onSell(product)}
          disabled={quantity === 0}
          className={`text-sm font-medium rounded-md px-4 py-1 transition duration-300 flex items-center justify-center ${quantity === 0
            ? "bg-gray-200 text-gray-500 cursor-default"
            : "bg-red-500 hover:bg-red-600 text-white"}`}
        >
          <span>- Sell</span>
        </button>
        <input
          type="number"
          value={quantity}
          onChange={handleQuantityChange}
          className="w-full text-center text-sm border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-200"
          min={0}
        />
        <button
          onClick={() => onBuy(product)}
          className="text-sm font-medium rounded-md px-4 py-1 transition duration-300 flex items-center justify-center bg-green-500 hover:bg-green-600 text-white"
        >
          <span>+ Buy</span>
        </button>
      </div>
    </div>
  )
}

export default ProductCard
