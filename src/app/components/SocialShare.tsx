import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTwitter, faFacebookF, faInstagram } from "@fortawesome/free-brands-svg-icons"

interface SocialShareProps {
  summaryRef: React.RefObject<HTMLDivElement | null>
  totalSpent: number
}

const SocialShare: React.FC<SocialShareProps> = ({ summaryRef, totalSpent }) => {
  // Replace this with your actual URL (or a URL that generates a shareable image/summary)
  const appUrl = "https://piromomo.com/spend"
  const shareText = `I could only spent NPR ${totalSpent.toLocaleString()} of Binod Chaudary's Money. How much did you spend?` // Include totalSpent
  const encodedText = encodeURIComponent(shareText)
  const encodedUrl = encodeURIComponent(appUrl)

  // Share on Twitter
  const shareOnTwitter = () => {
    const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`
    window.open(twitterShareUrl, "_blank")
  }

  // Share on Facebook
  const shareOnFacebook = () => {
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
    window.open(facebookShareUrl, "_blank")
  }

  // Share on LinkedIn
  const shareOnInstagram = () => {
    const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
    window.open(linkedInShareUrl, "_blank")
  }

  return (
    <div className="flex space-x-2 mb-2 justify-end">
    <div>Share:</div>
      {/* Twitter button */}
      <button
        onClick={shareOnTwitter}
        className="flex items-center justify-center border hover:border-blue-600 text-blue-500 hover:text-blue-600 font-medium py-1.5 px-3 rounded-lg text-sm transition duration-300 ease-in-out"
      >
        <FontAwesomeIcon icon={faTwitter} className="text-xs" />
      </button>

      {/* Facebook button */}
      <button
        onClick={shareOnFacebook}
        className="flex items-center justify-center border hover:border-blue-800 text-blue-700 hover:text-blue-800 font-medium py-1.5 px-3 rounded-lg text-sm transition duration-300 ease-in-out"
      >
        <FontAwesomeIcon icon={faFacebookF} className="text-xs" />
      </button>

      {/* Instagram button */}
      <button
        onClick={shareOnInstagram}
        className="flex items-center justify-center border hover:border-[#D32F49] text-[#E4405F] hover:text-[#D32F49] font-medium py-1.5 px-3 rounded-lg text-sm transition duration-300 ease-in-out"
      >
        <FontAwesomeIcon icon={faInstagram} className="text-xs" />
      </button>
    </div>
  )
}

export default SocialShare
