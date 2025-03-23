"use client"

import type React from "react"
import { useState, useEffect } from "react"
import emailjs from "emailjs-com"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")

  useEffect(() => {
    emailjs.init("nfgaFVXE8bbPQ9PAG")
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prevState) => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await emailjs.send("service_33yrlel", "template_qpworcj", formData)
      setSubmitMessage("Thank you for your message. We will get back to you soon!")
      setFormData({ name: "", email: "", phone: "", message: "" })
    } catch (error) {
      setSubmitMessage("Oops! There was an error sending your message. Please try again.")
    }

    setIsSubmitting(false)
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <div className="mt-1">
          <input
            type="text"
            name="name"
            id="name"
            autoComplete="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md text-black"
          />
        </div>
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <div className="mt-1">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md text-black"
          />
        </div>
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          Phone Number
        </label>
        <div className="mt-1">
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            placeholder="+91 XXXXXXXXXX"
            value={formData.phone}
            onChange={handleChange}
            className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md text-black"
          />
        </div>
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700">
          Message
        </label>
        <div className="mt-1">
          <textarea
            id="message"
            name="message"
            rows={4}
            required
            value={formData.message}
            onChange={handleChange}
            className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md text-black"
          />
        </div>
      </div>
      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {isSubmitting ? "Sending..." : "Send"}
        </button>
      </div>
      {submitMessage && <div className="mt-6 text-center text-sm text-gray-500">{submitMessage}</div>}
    </form>
  )
}

