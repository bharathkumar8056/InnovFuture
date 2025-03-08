"use client"

import React, { useState, useRef, useEffect } from "react"
import { FaComments, FaPaperPlane, FaTimes } from "react-icons/fa"

interface Message {
  text: string
  isUser: boolean
}

const predefinedQuestions = [
  "What's special about Innovfuture Solutions?",
  "How are the products made?",
  "Delivery information",
]

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [showPredefined, setShowPredefined] = useState(true)
  const [askingLocation, setAskingLocation] = useState({ status: false, step: 0 })
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768) // Set mobile view if screen width ≤ 768px
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleToggle = () => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      setMessages([
        { text: "Hello! How can I help you today? Please select one of the following questions:", isUser: false },
      ])
      setShowPredefined(true)
      setAskingLocation({ status: false, step: 0 })
    }
  }

  const handleSend = () => {
    if (input.trim()) {
      setMessages((prev) => [...prev, { text: input, isUser: true }])
      handleResponse(input)
      setInput("")
    }
  }

  const handlePredefinedQuestion = (question: string) => {
    setMessages((prev) => [...prev, { text: question, isUser: true }])
    handleResponse(question)
    setShowPredefined(false)
  }

  const handleResponse = (question: string) => {
    let response = ""
    if (askingLocation.status) {
      if (askingLocation.step === 1) {
        response = `Thank you. And which area within ${question}?`
        setAskingLocation({ status: true, step: 2 })
      } else if (askingLocation.step === 2) {
        response = `Thank you for providing your location details. For specific delivery information to ${question}, please contact us at info@innovfuturesolutions.com or call us at +91-7010735275.`
        setAskingLocation({ status: false, step: 0 })
        setShowPredefined(true)
      }
    } else {
      switch (question.toLowerCase()) {
        case "what's special about innovfuture solutions?":
          response = "Innovfuture Solutions specializes in high-quality, sustainably sourced agro products."
          setShowPredefined(true)
          break
        case "how are the products made?":
          response = "Our products are made using a combination of traditional and modern methods."
          setShowPredefined(true)
          break
        case "delivery information":
          response = "Sure, I can help you with delivery information. Which country are you located in?"
          setAskingLocation({ status: true, step: 1 })
          break
        default:
          response = "I'm sorry, I don't have information on that topic. Please choose a question:"
          setShowPredefined(true)
      }
    }
    setTimeout(() => {
      setMessages((prev) => [...prev, { text: response, isUser: false }])
    }, 500)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div
          className={`fixed bg-white shadow-lg border flex flex-col overflow-hidden transition-all ${
            isMobile
              ? "w-screen h-screen top-0 left-0"
              : "w-[400px] h-[500px] bottom-16 right-4 rounded-lg"
          }`}
        >
          {/* Chat header with close button */}
          <div className="bg-green-600 text-white p-4 flex justify-between items-center">
            <h3 className="text-lg font-semibold">Innovfuture Solutions Chat</h3>
            <button onClick={handleToggle} className="text-white hover:text-gray-300">
              <FaTimes size={20} />
            </button>
          </div>

          {/* Chat messages */}
          <div className="flex-grow overflow-y-auto p-4">
            {messages.map((message, index) => (
              <div key={index} className={`mb-4 ${message.isUser ? "text-right" : "text-left"}`}>
                <span
                  className={`inline-block max-w-[85%] break-words p-2 rounded-lg ${
                    message.isUser ? "bg-green-100 text-green-800" : "bg-green-600 text-white"
                  }`}
                >
                  {message.text}
                </span>
              </div>
            ))}

            {/* Predefined questions */}
            {showPredefined && (
              <div className="mt-4">
                {predefinedQuestions.map((question, index) => (
                  <button
                    key={index}
                    className="block w-full text-left text-sm text-green-600 hover:text-green-800 mb-2 p-2 rounded-lg hover:bg-green-100 transition duration-300"
                    onClick={() => handlePredefinedQuestion(question)}
                  >
                    {question}
                  </button>
                ))}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat input */}
          <div className="p-4 border-t">
            <div className="flex">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-grow px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
              />
              <button
                onClick={handleSend}
                className="bg-green-600 text-white px-4 py-2 rounded-r-md hover:bg-green-700 transition duration-300"
              >
                <FaPaperPlane />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating chat button */}
      <button
        onClick={handleToggle}
        className="bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition duration-300"
      >
        <FaComments size={24} />
      </button>
    </div>
  )
}

export default ChatBot
