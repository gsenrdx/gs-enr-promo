import Link from "next/link"
import { ProjectGallery } from "@/components/project-gallery"
import { HeroSection } from "@/components/hero-section"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      {/* 넷플릭스 스타일 히어로 섹션 */}
      <HeroSection />
      
      {/* 프로젝트 갤러리 */}
      <div className="-mt-32 relative z-10">
        <ProjectGallery featured={true} />
      </div>
      
      {/* 발제 CTA 섹션 */}
      <section className="container py-12 relative z-10 border-t border-white/10 mt-8">
        <div className="max-w-screen-lg mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">새로운 프로젝트를 발제하세요</h2>
              <p className="text-white/70">
                GS E&R 52g Unit과 함께 혁신적인 아이디어를 현실로 만들어보세요. 
                여러분의 창의적인 발상이 에너지 산업의 미래를 변화시킬 수 있습니다.
              </p>
            </div>
            <div>
              <Button asChild className="bg-white hover:bg-white/90 text-black border-0">
                <Link href="/propose" className="flex items-center gap-2">
                  프로젝트 발제하기
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
