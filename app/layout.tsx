import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "GS E&R 52g Unit",
  description: "GS E&R의 추진 프로젝트를 효과적으로 홍보하고 신규 과제 접수를 위한 소통의 장을 제공합니다.",
  generator: 'kyle'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" suppressHydrationWarning className="dark">
      <body className={`${inter.className} bg-black text-white`}>
        <div className="relative flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        
        {/* 미소 챗봇 스크립트 */}
        <Script id="miso-chatbot-config" strategy="beforeInteractive">
          {`
            window.misoChatbotConfig = {
              token: "3ytdyMdqYeWBxKHs",
              baseUrl: "https://52g.miso.gs"
            }
          `}
        </Script>
        <Script 
          src="https://52g.miso.gs/embed.min.js"
          id="3ytdyMdqYeWBxKHs"
          strategy="beforeInteractive"
        />
      </body>
    </html>
  )
}