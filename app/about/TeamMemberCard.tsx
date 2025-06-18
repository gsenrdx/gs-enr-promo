"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { TeamMember } from "./page"

export default function TeamMemberCard({ member }: { member: TeamMember }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ 
        scale: 1.05,
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)"
      }}
      className={`rounded-xl overflow-hidden bg-gray-800 backdrop-blur-sm bg-opacity-80 border border-gray-700 transition-all flex flex-col h-full`}
    >
      <div className="relative p-6 flex justify-center">
        {member.isLeader && (
          <div className="absolute top-3 right-3 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold z-10 shadow-lg">
            유닛리더
          </div>
        )}
        <motion.div 
          className="relative w-44 h-44 rounded-full overflow-hidden"
          whileHover={{ scale: 1.05 }}
          style={{ background: member.backgroundColor }}
        >
          <Image
            src={member.image}
            alt={`${member.name} 프로필 이미지`}
            fill
            className="object-cover object-center scale-110"
            priority
          />
        </motion.div>
      </div>
      <div className="px-6 py-4 flex-grow flex flex-col">
        <div className="flex-grow-0">
          <div className="font-bold text-2xl mb-2 text-center text-white">
            {member.name}
          </div>
          <p className="text-gray-300 text-center font-medium">{member.company}</p>
          <div className="flex justify-center mt-2">
            <motion.p 
              className={`text-center py-1 px-4 rounded-full text-white text-sm font-medium`}
              style={{ backgroundColor: member.backgroundColor }}
              whileHover={{ scale: 1.05 }}
            >
              {member.role}
            </motion.p>
          </div>
        </div>
        <p className="text-gray-400 text-center mt-4">{member.description}</p>
      </div>
    </motion.div>
  )
} 