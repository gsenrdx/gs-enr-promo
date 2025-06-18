"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // 실제 구현에서는 API 호출로 대체
    setTimeout(() => {
      setIsLoading(false)

      // 임시 로그인 처리 (실제로는 인증 로직 구현 필요)
      if (email.endsWith("@gs.com")) {
        toast({
          title: "로그인 성공",
          description: "GS E&R 52g Unit에 오신 것을 환영합니다.",
        })
        // 로그인 후 리디렉션 (실제 구현 필요)
      } else {
        toast({
          title: "로그인 실패",
          description: "GS 계정으로만 로그인이 가능합니다.",
          variant: "destructive",
        })
      }
    }, 1500)
  }

  return (
    <div className="container flex h-screen items-center justify-center">
      <div className="mx-auto max-w-sm">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">로그인</CardTitle>
            <CardDescription>GS E&R 계정으로 로그인하세요</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">이메일</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@gs.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">비밀번호</Label>
                  <Link href="/forgot-password" className="text-sm text-primary underline-offset-4 hover:underline">
                    비밀번호 찾기
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "로그인 중..." : "로그인"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
      <Toaster />
    </div>
  )
}
