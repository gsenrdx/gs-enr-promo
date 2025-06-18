"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Activity, Users, Lightbulb, TrendingUp } from "lucide-react"

export function StatsSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById("stats-section")
    if (element) observer.observe(element)

    return () => {
      if (element) observer.disconnect()
    }
  }, [])

  const stats = [
    {
      icon: <Activity className="h-8 w-8 text-primary" />,
      value: 24,
      label: "진행 중인 프로젝트",
      suffix: "개",
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      value: 120,
      label: "참여 임직원",
      suffix: "명",
    },
    {
      icon: <Lightbulb className="h-8 w-8 text-primary" />,
      value: 87,
      label: "발제 건수",
      suffix: "건",
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-primary" />,
      value: 32,
      label: "성공적 완료",
      suffix: "%",
    },
  ]

  return (
    <section id="stats-section" className="bg-muted py-12 md:py-24">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">52g Unit의 성과</h2>
          <p className="mt-4 text-muted-foreground md:text-xl">혁신적인 프로젝트를 통해 이루어낸 성과들을 확인하세요</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="border-none shadow-sm">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="mb-4 p-3 rounded-full bg-primary/10">{stat.icon}</div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-4xl font-bold"
                >
                  {stat.value}
                  {stat.suffix}
                </motion.div>
                <p className="text-muted-foreground mt-2">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
