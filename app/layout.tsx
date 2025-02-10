import "./globals.css"
import { Poppins, Playfair_Display } from "next/font/google"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

export const metadata = {
  title: "Innovfuture Solutions",
  description:
    "Discover our range of high-quality oils and agro products. Sourced from nature, delivered to your doorstep.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`scroll-smooth ${poppins.variable} ${playfair.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="font-sans">{children}</body>
    </html>
  )
}

