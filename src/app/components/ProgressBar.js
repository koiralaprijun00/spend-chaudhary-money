import React from "react"

const ProgressBar = ({ total, spent }) => {
  const percentage = (spent / total * 100).toFixed(2)

  return (
    <div style={{ margin: "20px 0" }}>
      <div style={{ background: "#ddd", height: "20px", borderRadius: "10px" }}>
        <div
          style={{
            width: `${percentage}%`,
            background: percentage > 75 ? "red" : "green",
            height: "100%",
            borderRadius: "10px"
          }}
        />
      </div>
      <p>{`Spent: NPR ${spent.toLocaleString()} / Total: NPR ${total.toLocaleString()} (${percentage}%)`}</p>
    </div>
  )
}

export default ProgressBar
