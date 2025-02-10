import ContactForm from './ContactForm'

export default function ContactPage() {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Contact Us</h1>
          <p className="mt-4 text-lg text-gray-500">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
        <div className="mt-12 max-w-lg mx-auto">
          <ContactForm />
        </div>
      </div>
    </div>
  )
}

