import { Metadata } from "next"
import AboutContent from "./AboutContent"

export const metadata: Metadata = {
  title: "소개 | GS E&R 52g",
  description: "GS E&R 52g 팀원 소개 페이지입니다."
}

export interface TeamMember {
  id: string
  name: string
  image: string
  company: string
  role: string
  backgroundColor: string
  description: string
  isLeader?: boolean
}

export default function AboutPage() {
  const teamMembers: TeamMember[] = [
    {
      id: "lars",
      name: "Lars",
      image: "/assets/member/lars.png",
      company: "GS E&R",
      role: "DX",
      backgroundColor: "rgba(59, 130, 246, 0.8)", 
      description: "디지털 전환을 통한 에너지 시설의 스마트화와 효율 향상을 주도하고 있습니다.",
      isLeader: true
    },
    {
      id: "jay",
      name: "Jay",
      image: "/assets/member/jay.png",
      company: "GS동해전력",
      role: "설비운전",
      backgroundColor: "rgba(217, 119, 6, 0.8)",
      description: "동해 지역 전력 생산 시설의 안정적인 운전과 효율성 개선을 담당하고 있습니다."
    },
    {
      id: "m",
      name: "M",
      image: "/assets/member/m.png",
      company: "GS반월열병합발전",
      role: "설비운전/기계정비",
      backgroundColor: "rgba(156, 163, 175, 0.8)",
      description: "열병합발전 설비의 안정적 운전과 기계 부문 정비를 통한 신뢰성 확보를 담당합니다."
    },
    {
      id: "kyle",
      name: "Kyle",
      image: "/assets/member/kyle.png", 
      company: "GS포천그린에너지",
      role: "전기/계측제어",
      backgroundColor: "rgba(16, 185, 129, 0.8)",
      description: "전력 설비의 전기 시스템 및 계측제어 최적화를 통한 성능 향상을 담당합니다."
    },
    {
      id: "aiden",
      name: "Aiden",
      image: "/assets/member/aiden.png",
      company: "GS구미열병합발전",
      role: "환경",
      backgroundColor: "rgba(245, 158, 11, 0.8)",
      description: "구미 지역의 환경 관리와 관련 문제 개선을 담당하고 있습니다."
    }
  ]

  return <AboutContent teamMembers={teamMembers} />
} 