import type { Metadata } from "next"
import { Lora } from "next/font/google"
import "./globals.css"

const lora = Lora({
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: {
    template: "%s | PhDBui Shop",
    absolute: "PhDBui Shop",
  },
  description: "A full-stack e-commerce application built with Next.js 15",
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${lora.className} antialiased`}>{children}</body>
    </html>
  )
}
