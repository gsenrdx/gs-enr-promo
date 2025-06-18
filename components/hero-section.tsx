"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Mail, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

// 히어로 프로젝트 데이터 배열
const heroProjects = [
  {
    id: 1,
    title: "스마트 입출입 시스템",
    titleImage: "/placeholder.svg?height=120&width=400&key=access-title",
    tagline: "보안과 편의성의 완벽한 조화",
    description: "GS E&R의 스마트 입출입 시스템은 얼굴인식과 모바일 기반 출입관리를 통합한 차세대 보안 솔루션입니다. 발전소와 에너지 시설의 보안을 강화하면서도 직원들의 출입 편의성을 극대화했습니다.",
    tags: ["AI 안면인식", "모바일 인증", "클라우드 통합"],
    year: "2023",
    image: "https://images.unsplash.com/photo-1541185934-01b600ea069c?q=80&w=1800&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "발전소 원격 모니터링",
    titleImage: "/placeholder.svg?height=120&width=400&key=monitoring-title",
    tagline: "언제 어디서나 실시간 발전소 관리",
    description: "GS E&R의 원격 모니터링 시스템은 전국 발전소의 운영 상태를 실시간으로 감시하고 분석합니다. IoT 센서와 빅데이터 분석을 통해 고장 예측과 효율적인 유지보수가 가능합니다.",
    tags: ["IoT", "실시간 모니터링", "예측 유지보수"],
    year: "2023",
    image: "https://images.unsplash.com/photo-1513828583688-c52646db42da?q=80&w=1800&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "에너지 효율화 솔루션",
    titleImage: "/placeholder.svg?height=120&width=400&key=efficiency-title",
    tagline: "지속가능한 미래를 위한 스마트 에너지",
    description: "GS E&R의 에너지 효율화 솔루션은 발전소와 산업시설의 에너지 소비를 최적화합니다. AI 기반 분석을 통해 최대 30%의 에너지 절감 효과를 달성하며 탄소 배출량을 크게 줄입니다.",
    tags: ["에너지 최적화", "탄소 저감", "AI 분석"],
    year: "2023",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=1800&auto=format&fit=crop"
  }
]

// 제목 이미지도 추가
const projectLogos = {
  access: {
    light: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    dark: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  monitoring: {
    light: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    dark: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  efficiency: {
    light: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    dark: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  }
}

// 문의하기 모달 컴포넌트
function ContactModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          size="default" 
          variant="outline" 
          className="bg-transparent hover:bg-white/10 border-white text-white font-medium rounded-md"
        >
          담당자 문의하기
          <Mail className="ml-2 h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader>
          <DialogTitle className="text-black">담당자 문의하기</DialogTitle>
          <DialogDescription className="text-gray-500">
            아래 이메일 또는 링크를 통해 프로젝트 담당자에게 연락하세요.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-gray-700">이메일 주소</label>
            <div className="flex items-center border rounded p-2 bg-gray-50">
              <span className="text-gray-800">cjk1306@gspoge.com</span>
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-gray-700">바로 문의하기</label>
            <a 
              href="https://works.do/R/ti/p/cjk1306@gspoge.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              문의하기 링크 열기
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const currentProject = heroProjects[currentIndex]
  
  // 자동 슬라이드 효과 - 더 느리게 조정
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % heroProjects.length)
    }, 10000) // 10초마다 슬라이드 변경 (기존 5초에서 변경)
    
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full h-[60vh] md:h-[65vh] lg:h-[70vh] overflow-hidden">
      {/* 배경 이미지 */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }} // 페이드 시간 1.5초로 늘림
          className="absolute inset-0 w-full h-full"
        >
          <img 
            src={currentProject.image} 
            alt={currentProject.title} 
            className="w-full h-full object-cover"
          />
          
          {/* 그라데이션 오버레이 - 더 밝게 조정 */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
        </motion.div>
      </AnimatePresence>
      
      {/* 히어로 콘텐츠 - 중앙 정렬 */}
      <div className="relative container mx-auto h-full flex flex-col justify-center px-4 z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }} // 콘텐츠 애니메이션 시간 증가
            className="max-w-2xl"
          >
            {/* 타이틀 이미지 또는 텍스트 */}
            {currentProject.id === 1 ? (
              <motion.h1 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }} // 딜레이와 시간 증가
                className="text-3xl md:text-5xl font-bold tracking-tight mb-3 text-white"
              >
                {currentProject.title}
              </motion.h1>
            ) : currentProject.id === 2 ? (
              <motion.h1 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-3xl md:text-5xl font-bold tracking-tight mb-3 text-white"
              >
                {currentProject.title}
              </motion.h1>
            ) : (
              <motion.h1 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-3xl md:text-5xl font-bold tracking-tight mb-3 text-white"
              >
                {currentProject.title}
              </motion.h1>
            )}
            
            {/* 태그라인 */}
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }} // 딜레이와 시간 증가
              className="text-lg md:text-xl text-white font-medium mb-3"
            >
              {currentProject.tagline}
            </motion.p>
            
            {/* 설명 */}
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }} // 딜레이와 시간 증가
              className="text-white/80 text-sm md:text-base mb-5 max-w-xl leading-relaxed"
            >
              {currentProject.description}
            </motion.p>
            
            {/* 태그 */}
            <div className="flex flex-wrap gap-2 mb-5">
              {currentProject.tags.map((tag, index) => (
                <motion.span 
                  key={`${currentIndex}-${index}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 1.0 + (index * 0.15) }} // 딜레이와 태그 간 간격 증가
                  className="text-white/90 text-xs bg-white/10 px-3 py-1 rounded-sm"
                >
                  {tag}
                </motion.span>
              ))}
            </div>
            
            {/* 액션 버튼 */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }} // 딜레이 증가
              className="flex flex-wrap gap-3"
            >
              <Button 
                size="default" 
                className="bg-white hover:bg-white/90 text-black font-medium rounded-md"
              >
                프로젝트 살펴보기
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              
              {/* 문의하기 버튼 */}
              <ContactModal />
            </motion.div>
          </motion.div>
        </AnimatePresence>
        
        {/* 슬라이드 인디케이터 */}
        <div className="absolute bottom-5 left-0 right-0 flex justify-center space-x-2">
          {heroProjects.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-500 ${
                index === currentIndex ? 'bg-white w-6' : 'bg-white/50'
              }`}
              aria-label={`슬라이드 ${index + 1} 보기`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
