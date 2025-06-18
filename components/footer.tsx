import Link from "next/link"
import { Instagram, Linkedin, Github, ArrowUpRight } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-black/95 text-white/80">
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <Link href="/" className="font-bold text-xl text-white mb-4 md:mb-0 flex items-center gap-1">
            GS E&R <span className="text-green-400 text-sm">52g</span>
          </Link>
          
          <div className="flex flex-wrap gap-4 md:gap-8">
            <Link href="/about" className="hover:text-green-400 text-sm transition-colors duration-200">회사 소개</Link>
            <Link href="/projects" className="hover:text-green-400 text-sm transition-colors duration-200">프로젝트</Link>
            <Link href="/contact" className="hover:text-green-400 text-sm transition-colors duration-200">문의하기</Link>
            <Link href="/resources" className="hover:text-green-400 text-sm transition-colors duration-200">자료실</Link>
          </div>

          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="https://instagram.com" className="hover:text-green-400 transition-colors duration-200">
              <Instagram size={18} />
            </Link>
            <Link href="https://linkedin.com" className="hover:text-green-400 transition-colors duration-200">
              <Linkedin size={18} />
            </Link>
            <Link href="https://github.com" className="hover:text-green-400 transition-colors duration-200">
              <Github size={18} />
            </Link>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-white/60 pt-4 border-t border-white/10">
          <div className="flex gap-4 mb-3 md:mb-0">
            <Link href="/privacy" className="hover:underline">개인정보처리방침</Link>
            <Link href="/terms" className="hover:underline">이용약관</Link>
          </div>
          <p>© 2024 GS E&R. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
