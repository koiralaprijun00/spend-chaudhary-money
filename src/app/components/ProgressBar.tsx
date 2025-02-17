import React from "react"

const ProgressBar = ({ total, spent }: { total: number; spent: number }) => {
  const percentage = (spent / total * 100).toFixed(2)

  return (
    <div className="mt-4">
      <div style={{ background: "#ddd", height: "20px", borderRadius: "2px" }}>
        <div
          style={{
            width: `${percentage}%`,
            background: parseFloat(percentage) > 75 ? "#dc143c" : "#0055a4", // Nepal red and blue
            height: "100%",
            borderRadius: "2px"
          }}
        />
      </div>
      <p className="text-gray-800 dark:text-white">{`Spent: NPR ${spent.toLocaleString()} / Total: NPR ${total.toLocaleString()} (${percentage}%)`}</p>
    </div>
  )
}

export default ProgressBar
