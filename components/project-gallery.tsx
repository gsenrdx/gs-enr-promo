"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ProjectCard, sampleProjects } from "@/components/project-card"
import { ChevronRight } from "lucide-react"
import useEmblaCarousel from "embla-carousel-react"

// 프로젝트 카테고리
const categories = [
  { id: "featured", name: "인기 프로젝트" },
  { id: "energy", name: "에너지 효율화 프로젝트" },
  { id: "security", name: "보안 시스템" },
  { id: "digital", name: "디지털 트랜스포메이션" }
]

// 카테고리 정보를 추가한 프로젝트 데이터
const allProjects = [
  // 기존 샘플 프로젝트 데이터 활용
  {
    ...sampleProjects[0], // 스마트 입출입 시스템
    categories: ["featured", "security"]
  },
  {
    ...sampleProjects[1], // 발전소 원격 모니터링
    categories: ["featured", "digital"]
  },
  {
    ...sampleProjects[2], // 에너지 효율화 솔루션
    categories: ["featured", "energy"]
  },
  {
    ...sampleProjects[3], // 설비 자동화 시스템
    categories: ["energy", "digital"]
  },
  {
    ...sampleProjects[4], // 신재생 에너지 관리
    categories: ["energy", "digital"]
  },
  {
    id: 6,
    title: "전기차 충전 인프라",
    description: "도시 전역에 효율적인 전기차 충전 인프라 구축 프로젝트",
    image: "https://images.unsplash.com/photo-1593941707882-a5bfcebe7608?q=80&w=800&auto=format&fit=crop",
    tags: ["전기차", "충전", "인프라"],
    categories: ["energy", "digital"],
  },
  {
    id: 7,
    title: "드론 기반 시설 점검",
    description: "드론과 AI를 활용한 발전소 및 에너지 시설의 안전 점검 시스템",
    image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?q=80&w=800&auto=format&fit=crop",
    tags: ["드론", "AI", "시설점검"],
    categories: ["security", "digital"],
  },
  {
    id: 8,
    title: "발전소 보안 솔루션",
    description: "발전 시설 보안을 위한 통합 관제 및 출입 통제 시스템",
    image: "https://images.unsplash.com/photo-1610492618063-5905bbd4b8ab?q=80&w=800&auto=format&fit=crop",
    tags: ["보안", "통합관제", "출입통제"],
    categories: ["security", "digital"],
  }
]

// 프로젝트 슬라이더 행 컴포넌트
function ProjectRow({ title, projects }: { title: string; projects: any[] }) {
  const [emblaRef] = useEmblaCarousel({
    dragFree: true,
    containScroll: "trimSnaps"
  })

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium text-white">{title}</h2>
        <Link href="/projects" className="flex items-center text-sm text-white/70 hover:text-white">
          더보기 <ChevronRight className="h-4 w-4 ml-1" />
        </Link>
      </div>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex -ml-4">
          {projects.map((project) => (
            <div key={project.id} className="flex-none pl-4" style={{ width: "280px" }}>
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

interface ProjectGalleryProps {
  featured?: boolean
}

export function ProjectGallery({ featured = false }: ProjectGalleryProps) {
  return (
    <section className="py-12 bg-black">
      <div className="container px-4">
        {featured ? (
          // 홈페이지에 특정 카테고리만 표시
          <ProjectRow 
            title="인기 프로젝트" 
            projects={allProjects.filter(p => p.categories.includes("featured"))} 
          />
        ) : (
          // 프로젝트 페이지에는 모든 카테고리 표시
          <div>
            {categories.map((category) => (
              <ProjectRow 
                key={category.id} 
                title={category.name} 
                projects={allProjects.filter(p => p.categories.includes(category.id))} 
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
