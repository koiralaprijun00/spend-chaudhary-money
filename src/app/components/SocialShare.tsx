import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTwitter, faFacebookF } from "@fortawesome/free-brands-svg-icons"

interface SocialShareProps {
  summaryRef: React.RefObject<HTMLDivElement | null>
  totalSpent: number
}

const SocialShare: React.FC<SocialShareProps> = ({ totalSpent }) => {
  // Replace this with your actual URL (or a URL that generates a shareable image/summary)
  const appUrl = "https://piromomo.com/spend"
  const shareText = `I tried to spend Binod Chaudhary's billions, but I could only burn through NPR ${totalSpent.toLocaleString()}! 💸💰

Can you do better? 😏 Play now and see how fast you can drain his fortune! 🔥👇

`

  const encodedText = encodeURIComponent(shareText)
  const encodedUrl = encodeURIComponent(appUrl)

  // Share on Twitter
  const shareOnTwitter = () => {
    const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`
    window.open(twitterShareUrl, "_blank")
  }

  const shareOnFacebook = () => {
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
    window.open(facebookShareUrl, "_blank")
  }

  return (
    <div className="flex space-x-2 mb-2 justify-end">
      <div>Share:</div>
      {/* Twitter button */}
      <button
        onClick={shareOnTwitter}
        className="flex items-center justify-center border border-gray-400  hover:border-gray-800 text-blue-500 hover:text-blue-400 font-medium py-1.5 px-3 rounded-sm text-sm transition duration-300 ease-in-out"
      >
        <FontAwesomeIcon icon={faTwitter} className="text-xs" />
      </button>

      {/* Facebook button */}
      <button
        onClick={shareOnFacebook}
        className="flex items-center justify-center border border-gray-400  hover:border-gray-800 text-blue-700 hover:text-blue-800 font-medium py-1.5 px-3 rounded-sm text-sm transition duration-300 ease-in-out"
      >
        <FontAwesomeIcon icon={faFacebookF} className="text-xs" />
      </button>
    </div>
  )
}

export default SocialShare
