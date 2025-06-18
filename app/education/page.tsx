"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

export default function EducationPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="container mx-auto pt-24 px-4">
        <h1 className="text-3xl font-bold mb-8">교육 프로그램</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="relative h-48 w-full">
              <Image 
                src="/assets/nocode-thumbnail.svg" 
                alt="노코드 교육" 
                fill 
                className="object-cover"
              />
            </div>
            <CardHeader>
              <CardTitle>노코드 교육</CardTitle>
              <CardDescription>코딩 없이 노코드(No-Code) 도구를 활용해 업무용 앱을 직접 만들고 자동화하는 방법을 배우는 실습형 과정</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">
                개발 없이도 직접 원하는 앱을 만들어보세요! 노코드 툴을 이용한 앱 개발 과정을 학습합니다.
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href="https://gsenrdx52g.gitbook.io/e-learning" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                  바로가기 <ExternalLink className="h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
          
          {/* 추가 교육 카드는 이곳에 추가 가능 */}
        </div>
      </div>
    </div>
  )
} 