"use client"

import { motion } from "framer-motion"
import TeamMemberCard from "./TeamMemberCard"
import { TeamMember } from "./page"

interface AboutContentProps {
  teamMembers: TeamMember[]
}

export default function AboutContent({ teamMembers }: AboutContentProps) {
  return (
    <main className="container mx-auto pt-32 pb-24 px-4 bg-gray-900 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center text-white bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-400">팀원 소개</h1>
        <p className="text-lg text-center max-w-3xl mx-auto mb-16 text-gray-300">
          GS E&R 52g 팀은 각 발전소 현장의 문제를 발견하고 개선하는 
          현장 중심 혁신 조직입니다.
        </p>
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {teamMembers.map((member) => (
          <TeamMemberCard key={member.id} member={member} />
        ))}
      </motion.div>
    </main>
  )
} 