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
    <div className="border border-gray-300 rounded-xl p-4 my-4 w-80 shadow-sm bg-white transition duration-300 hover:shadow-md flex flex-col">
      {" "}{/* Added flex flex-col */}
      <div className="relative h-48 rounded-xl mb-3 overflow-hidden">
        {" "}{/* Increased height, rounded corners */}
        {product.image
          ? <Image
              src={product.image}
              alt={product.name}
              layout="fill"
              objectFit="cover"
              placeholder="blur"
              blurDataURL="/default-placeholder.png"
              className="rounded-xl" // Rounded corners for image
            />
          : <div className="absolute inset-0 flex items-center justify-center text-gray-400">No Image Available</div>}
      </div>
      <div className="flex-grow">
        {" "}{/* Added flex-grow to push content to top */}
        <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
        <p className="text-sm text-gray-600 line-clamp-3 mb-2">{product.description}</p>
        <p className="text-base font-medium">NPR {product.price.toLocaleString()}</p>
      </div>{" "}
      {/* Close flex-grow */}
      <div className="mt-3 flex items-center justify-between">
        <button
          onClick={() => onSell(product)}
          disabled={quantity === 0}
          className={`text-sm font-medium rounded-md px-6 py-1 transition duration-300 flex items-center justify-center ${// Added flex and justify
          quantity === 0 ? "bg-gray-200 text-gray-500 cursor-default" : "bg-red-500 hover:bg-red-600 text-white"}`}
        >
          <span>-</span> {/* Minus sign in a span */}
          <span className="ml-1">Sell</span> {/* Sell text in a span with margin */}
        </button>
        <input
          type="number"
          value={quantity}
          onChange={handleQuantityChange}
          className="w-16 text-center text-sm border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-200"
          min={0}
        />
        <button
          onClick={() => onBuy(product)}
          className="text-sm font-medium rounded-md px-6 py-1 bg-green-500 hover:bg-green-600 text-white transition duration-300 flex items-center justify-center" // Added flex and justify
        >
          <span>+</span> {/* Plus sign in a span */}
          <span className="ml-1">Buy</span> {/* Buy text in a span with margin */}
        </button>
      </div>
    </div>
  )
}

export default ProductCard
