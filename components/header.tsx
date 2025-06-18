"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { BellRing, Menu, Search, User, X } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 z-50 w-full bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex items-center">
              <Image 
                src="/assets/gs-enr-logo.png" 
                alt="GS E&R 로고" 
                width={90} 
                height={30} 
                className="w-[90px] h-auto"
                style={{ maxHeight: '30px' }}
              />
              <span className="text-sm text-white ml-2">52g</span>
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium text-white/90 hover:text-white transition-colors">
              홈
            </Link>
            <Link href="/projects" className="text-sm font-medium text-white/70 hover:text-white transition-colors">
              프로젝트
            </Link>
            <Link href="/propose" className="text-sm font-medium text-white/70 hover:text-white transition-colors">
              발제하기
            </Link>
            <Link href="/education" className="text-sm font-medium text-white/70 hover:text-white transition-colors">
              교육
            </Link>
            <Link href="/about" className="text-sm font-medium text-white/70 hover:text-white transition-colors">
              소개
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="text-white/70 hover:text-white">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-white/70 hover:text-white">
            <BellRing className="h-5 w-5" />
          </Button>
          <Link href="/login">
            <Button variant="ghost" size="icon" className="text-black hover:text-black/80 rounded-full overflow-hidden bg-white">
              <User className="h-5 w-5" />
            </Button>
          </Link>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white/70 hover:text-white md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-black/90 backdrop-blur-sm border-t border-white/10 md:hidden">
          <nav className="container flex flex-col space-y-4 py-4">
            <Link href="/" className="text-sm font-medium text-white/90 hover:text-white">
              홈
            </Link>
            <Link href="/projects" className="text-sm font-medium text-white/70 hover:text-white">
              프로젝트
            </Link>
            <Link href="/propose" className="text-sm font-medium text-white/70 hover:text-white">
              발제하기
            </Link>
            <Link href="/education" className="text-sm font-medium text-white/70 hover:text-white">
              교육
            </Link>
            <Link href="/about" className="text-sm font-medium text-white/70 hover:text-white">
              소개
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
