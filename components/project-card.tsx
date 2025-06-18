"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpRight, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// 샘플 프로젝트 데이터
export const sampleProjects = [
  {
    id: 1,
    title: "스마트 입출입 시스템",
    description: "첨단 안면인식 기술을 활용한 발전소 출입 관리 시스템으로, 출입 보안과 편의성을 동시에 개선합니다.",
    image: "https://images.unsplash.com/photo-1541185934-01b600ea069c?q=80&w=800&auto=format&fit=crop",
    tags: ["AI 안면인식", "모바일 인증", "클라우드"],
    categories: ["보안", "시설관리"]
  },
  {
    id: 2,
    title: "발전소 원격 모니터링",
    description: "전국 발전소 설비를 실시간 모니터링하는 시스템으로, 비상상황 감지 및 예측 정비를 지원합니다.",
    image: "https://images.unsplash.com/photo-1513828583688-c52646db42da?q=80&w=800&auto=format&fit=crop",
    tags: ["IoT", "실시간 모니터링", "AI 예측"],
    categories: ["발전소", "모니터링"]
  },
  {
    id: 3,
    title: "에너지 효율화 솔루션",
    description: "발전소와 산업시설의 에너지 사용을 최적화하고 탄소 배출을 줄이는 AI 기반 효율화 솔루션입니다.",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=800&auto=format&fit=crop",
    tags: ["에너지 최적화", "탄소 저감", "AI 분석"],
    categories: ["지속가능성", "에너지"]
  },
  {
    id: 4,
    title: "설비 자동화 시스템",
    description: "발전소 설비 자동화 솔루션으로 운영 효율성을 높이고 인적 오류를 최소화합니다.",
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=800&auto=format&fit=crop",
    tags: ["자동화", "설비관리", "최적화"],
    categories: ["자동화", "운영"]
  },
  {
    id: 5,
    title: "신재생 에너지 관리",
    description: "태양광, 풍력 등 신재생 에너지 시설의 효율적 운영 및 최적화를 위한 통합 관리 시스템입니다.",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=800&auto=format&fit=crop",
    tags: ["신재생 에너지", "통합 관리", "최적화"],
    categories: ["신재생", "관리"]
  }
]

interface Project {
  id: number
  title: string
  description: string
  image: string
  tags: string[]
  categories?: string[]
}

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div 
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`aspect-[4/5] rounded-lg overflow-hidden transition-all duration-300 ${isHovered ? 'shadow-lg shadow-black/30' : ''}`}>
        <motion.div
          animate={{
            scale: isHovered ? 1.05 : 1,
            zIndex: isHovered ? 10 : 0,
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="h-full w-full relative"
        >
          {/* 카드 제목 (상단) */}
          <div className="absolute top-0 left-0 right-0 z-10 p-3 bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
            <div className="flex items-center justify-between">
              <h3 className="text-white font-semibold text-base tracking-tight line-clamp-1">{project.title}</h3>
              <ArrowUpRight className="h-4 w-4 text-white/70" />
            </div>
          </div>
          
          <img
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            className="object-cover w-full h-full"
          />
          
          {/* 호버시 나타나는 그라디언트 오버레이 */}
          <AnimatePresence>
            {isHovered && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"
                transition={{ duration: 0.2 }}
              />
            )}
          </AnimatePresence>
          
          {/* 호버시만 나타나는 컨텐츠 */}
          <AnimatePresence>
            {isHovered && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-0 left-0 right-0 p-4 flex flex-col justify-end"
              >
                <div className="mb-3">
                  <p className="text-white/90 text-xs leading-relaxed line-clamp-2 mb-3">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="bg-black/40 border-white/30 text-white/90 text-[10px] tracking-tight py-0 px-1.5 rounded-sm">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Link href={`/projects/${project.id}`} className="flex-grow">
                    <Button size="sm" className="w-full bg-white hover:bg-white/90 text-black text-xs font-medium rounded-md h-8 flex items-center justify-center">
                      프로젝트 보기
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}
