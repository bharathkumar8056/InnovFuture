import type React from "react"
import { FaWhatsapp } from "react-icons/fa"

interface FloatingWhatsAppProps {
  phoneNumber: string
  message?: string
}

const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ phoneNumber, message = "" }) => {
  const handleClick = () => {
    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank")
  }

  return (
    <div
      className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg cursor-pointer hover:bg-green-600 transition-colors duration-300 z-50"
      onClick={handleClick}
    >
      <FaWhatsapp size={32} />
    </div>
  )
}

export default FloatingWhatsApp

