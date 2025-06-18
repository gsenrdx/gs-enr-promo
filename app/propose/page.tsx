"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, CheckCircle2, FileText, Lightbulb } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// 샘플 프로젝트 데이터
const projects = [
  { id: 1, title: "에너지 효율화 시스템", description: "건물 에너지 소비를 최적화하는 시스템" },
  { id: 2, title: "친환경 연료 개발", description: "바이오 기반 친환경 연료 연구" },
  { id: 3, title: "스마트 그리드 솔루션", description: "에너지 분배 최적화 시스템" },
  { id: 4, title: "수소 에너지 저장 기술", description: "수소 에너지 효율적 저장 방안" },
  { id: 5, title: "태양광 발전 최적화", description: "태양광 패널 효율 증대 기술" },
  { id: 6, title: "전기차 충전 인프라", description: "도시 전기차 충전소 확장 계획" },
]

// 발제 가이드라인
const guidelines = [
  "발제는 구체적인 문제 정의와 해결 방안을 포함해야 합니다.",
  "기술적 실현 가능성과 비즈니스 가치를 모두 고려해주세요.",
  "필요한 자원과 예상 일정을 가능한 상세히 기재해주세요.",
  "기존 프로젝트와의 연계성이 있다면 함께 기재해주세요.",
  "발제 검토는 영업일 기준 3-5일 소요됩니다."
]

// 예시 템플릿
const templates = [
  {
    title: "기술 개선 제안",
    description: "기존 기술의 효율성 또는 성능을 개선하는 제안",
    impact: "에너지 효율 10% 증가, 운영 비용 절감 등의 효과 기대",
    resources: "연구원 2명, 개발자 3명, 예상 예산 5000만원",
    timeline: "연구 단계(2개월), 개발 단계(3개월), 테스트(1개월)"
  },
  {
    title: "신규 솔루션 개발",
    description: "새로운 에너지 관련 제품 또는 서비스 개발 제안",
    impact: "신규 시장 진출, 연간 매출 증대 기대, 경쟁사 대비 기술 우위 확보",
    resources: "기획팀 2명, 개발팀 5명, R&D 예산 1억원",
    timeline: "기획(1개월), 프로토타입 개발(3개월), 테스트 및 최적화(2개월)"
  }
]

export default function ProposePage() {
  const searchParams = useSearchParams()
  const projectId = searchParams.get("project")

  const [formData, setFormData] = useState({
    title: "",
    project: "",
    description: "",
    impact: "",
    resources: "",
    timeline: "",
    name: "",
    email: "",
    department: "",
    phone: ""
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [activeTab, setActiveTab] = useState("form")
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)

  // 프로젝트 ID가 URL에 있으면 해당 프로젝트 자동 선택
  useEffect(() => {
    if (projectId) {
      setFormData(prev => ({ ...prev, project: projectId }))
      
      // 프로젝트에 대한 추가 정보 가져오기 (실제로는 API 호출)
      const selectedProject = projects.find(p => p.id === Number(projectId))
      if (selectedProject) {
        toast({
          title: "프로젝트가 자동으로 선택되었습니다",
          description: `선택된 프로젝트: ${selectedProject.title}`,
        })
      }
    }
  }, [projectId])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, project: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // 실제 구현에서는 API 호출로 대체
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setActiveTab("success")
      
      toast({
        title: "발제가 성공적으로 제출되었습니다",
        description: "담당자 검토 후 연락드리겠습니다.",
      })
    }, 1500)
  }

  const resetForm = () => {
    setFormData({
      title: "",
      project: "",
      description: "",
      impact: "",
      resources: "",
      timeline: "",
      name: "",
      email: "",
      department: "",
      phone: ""
    })
    setIsSubmitted(false)
    setActiveTab("form")
    setSelectedTemplate(null)
  }

  const applyTemplate = (templateIndex: string) => {
    const template = templates[parseInt(templateIndex)]
    setFormData(prev => ({
      ...prev,
      title: template.title,
      description: template.description,
      impact: template.impact,
      resources: template.resources,
      timeline: template.timeline
    }))
    setSelectedTemplate(templateIndex)
    toast({
      title: "템플릿이 적용되었습니다",
      description: "내용을 검토하고 필요에 맞게 수정해주세요.",
    })
  }

  // 선택된 프로젝트 정보
  const selectedProjectInfo = formData.project && formData.project !== "new" 
    ? projects.find(p => p.id === Number(formData.project)) 
    : null

  return (
    <div className="container pt-24 pb-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">프로젝트 발제하기</h1>
          <p className="mt-4 text-gray-400">
            새로운 아이디어나 기존 프로젝트에 대한 제안을 자유롭게 작성해주세요.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="form" disabled={isSubmitted} className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">발제 작성</TabsTrigger>
            <TabsTrigger value="guidelines" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">발제 가이드라인</TabsTrigger>
          </TabsList>
          
          <TabsContent value="form">
            <Card className="bg-slate-900 border-slate-800 shadow-xl">
              <form onSubmit={handleSubmit}>
                <CardHeader className="border-b border-slate-800">
                  <CardTitle className="flex items-center gap-2 text-white">
                    <FileText className="h-5 w-5 text-blue-400" />
                    발제 정보
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    프로젝트 아이디어나 제안 내용을 상세히 작성해주세요.
                  </CardDescription>
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                    <TooltipProvider>
                      {templates.map((template, idx) => (
                        <Tooltip key={idx}>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className={`border-slate-700 bg-slate-800 hover:bg-slate-700 ${selectedTemplate === idx.toString() ? 'ring-2 ring-blue-500' : ''}`}
                              onClick={(e) => {
                                e.preventDefault()
                                applyTemplate(idx.toString())
                              }}
                            >
                              <Lightbulb className="h-4 w-4 mr-2 text-yellow-400" />
                              템플릿 {idx+1}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            <p className="font-semibold">{template.title}</p>
                            <p className="text-xs">{template.description}</p>
                          </TooltipContent>
                        </Tooltip>
                      ))}
                    </TooltipProvider>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-6 pt-6">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-gray-300">제목 <span className="text-red-400">*</span></Label>
                    <Input
                      id="title"
                      name="title"
                      placeholder="발제 제목을 입력하세요"
                      value={formData.title}
                      onChange={handleChange}
                      required
                      className="border-slate-700 bg-slate-800 text-white placeholder:text-gray-500 focus:ring-blue-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="project" className="text-gray-300">관련 프로젝트</Label>
                    <Select value={formData.project} onValueChange={handleSelectChange}>
                      <SelectTrigger className="border-slate-700 bg-slate-800 text-white focus:ring-blue-500">
                        <SelectValue placeholder="관련 프로젝트 선택 (선택사항)" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        <SelectItem value="new" className="text-white hover:bg-slate-700">새 프로젝트 제안</SelectItem>
                        {projects.map((project) => (
                          <SelectItem key={project.id} value={String(project.id)} className="text-white hover:bg-slate-700">
                            {project.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    {selectedProjectInfo && (
                      <div className="mt-2 p-3 rounded-md bg-slate-800 border border-slate-700">
                        <p className="text-xs text-gray-400">선택된 프로젝트 정보:</p>
                        <p className="text-sm text-white">{selectedProjectInfo.description}</p>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-gray-300">상세 내용 <span className="text-red-400">*</span></Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="발제 내용을 상세히 작성해주세요"
                      rows={5}
                      value={formData.description}
                      onChange={handleChange}
                      required
                      className="border-slate-700 bg-slate-800 text-white placeholder:text-gray-500 focus:ring-blue-500"
                    />
                    <p className="text-xs text-gray-500">문제점, 해결 방안, 기술적 접근 방식 등 자세히 설명해 주세요.</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="impact" className="text-gray-300">기대 효과 <span className="text-red-400">*</span></Label>
                    <Textarea
                      id="impact"
                      name="impact"
                      placeholder="이 발제가 가져올 수 있는 기대 효과를 작성해주세요"
                      rows={3}
                      value={formData.impact}
                      onChange={handleChange}
                      required
                      className="border-slate-700 bg-slate-800 text-white placeholder:text-gray-500 focus:ring-blue-500"
                    />
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="resources" className="text-gray-300">필요 자원</Label>
                      <Textarea
                        id="resources"
                        name="resources"
                        placeholder="필요한 인력, 예산 등을 작성해주세요"
                        rows={3}
                        value={formData.resources}
                        onChange={handleChange}
                        className="border-slate-700 bg-slate-800 text-white placeholder:text-gray-500 focus:ring-blue-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="timeline" className="text-gray-300">예상 일정</Label>
                      <Textarea
                        id="timeline"
                        name="timeline"
                        placeholder="프로젝트 진행 일정 및 주요 마일스톤을 작성해주세요"
                        rows={3}
                        value={formData.timeline}
                        onChange={handleChange}
                        className="border-slate-700 bg-slate-800 text-white placeholder:text-gray-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <Alert className="bg-slate-800 border-blue-900/50 text-white">
                    <AlertCircle className="h-4 w-4 text-blue-400" />
                    <AlertTitle className="text-blue-400">제안자 정보</AlertTitle>
                    <AlertDescription className="text-gray-400">
                      검토 후 연락드릴 수 있도록 정확한 정보를 입력해주세요.
                    </AlertDescription>
                  </Alert>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-gray-300">이름 <span className="text-red-400">*</span></Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="이름을 입력하세요"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="border-slate-700 bg-slate-800 text-white placeholder:text-gray-500 focus:ring-blue-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="department" className="text-gray-300">부서 <span className="text-red-400">*</span></Label>
                      <Input
                        id="department"
                        name="department"
                        placeholder="소속 부서를 입력하세요"
                        value={formData.department}
                        onChange={handleChange}
                        required
                        className="border-slate-700 bg-slate-800 text-white placeholder:text-gray-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-300">이메일 <span className="text-red-400">*</span></Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="회사 이메일을 입력하세요"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="border-slate-700 bg-slate-800 text-white placeholder:text-gray-500 focus:ring-blue-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-gray-300">연락처</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="연락 가능한 전화번호를 입력하세요"
                        value={formData.phone}
                        onChange={handleChange}
                        className="border-slate-700 bg-slate-800 text-white placeholder:text-gray-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="flex flex-col gap-4 border-t border-slate-800 bg-slate-900/50 pt-6">
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-medium"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "제출 중..." : "발제 제출하기"}
                  </Button>
                  <p className="text-xs text-gray-500 text-center">
                    제출된 발제는 영업일 기준 3-5일 내에 검토됩니다.
                  </p>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          
          <TabsContent value="guidelines">
            <Card className="bg-slate-900 border-slate-800 shadow-xl">
              <CardHeader className="border-b border-slate-800">
                <CardTitle className="flex items-center gap-2 text-white">
                  <FileText className="h-5 w-5 text-blue-400" />
                  발제 가이드라인
                </CardTitle>
                <CardDescription className="text-gray-400">
                  효과적인 발제를 위한 가이드라인을 참고해주세요.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-4">
                  {guidelines.map((guideline, index) => (
                    <li key={index} className="flex gap-3 bg-slate-800/50 p-3 rounded-md border-l-4 border-blue-500">
                      <span className="text-blue-400 flex-shrink-0 font-bold">{index + 1}.</span>
                      <span className="text-gray-300">{guideline}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-8 p-5 bg-slate-800 rounded-lg border border-slate-700">
                  <h3 className="font-medium mb-3 text-white flex items-center">
                    <Lightbulb className="h-4 w-4 mr-2 text-yellow-400" />
                    좋은 발제의 예시
                  </h3>
                  <p className="text-sm text-gray-400 mb-4">
                    구체적인 문제 정의, 명확한 해결 방안, 실현 가능한 일정과 필요 자원을 포함한 발제가 좋은 평가를 받습니다.
                    기존 프로젝트와의 연계성이나 시너지 효과를 설명하면 더욱 좋습니다.
                  </p>
                  
                  <div className="p-4 rounded-md bg-slate-700/50 border border-slate-600">
                    <h4 className="text-sm font-medium text-white mb-1">모범 사례: 태양광 발전 최적화 기법</h4>
                    <p className="text-xs text-gray-400 mb-2">문제점과 해결 방안이 명확하게 정의됨</p>
                    <div className="space-y-2">
                      <Badge className="bg-blue-600 text-xs">명확한 문제 정의</Badge>
                      <Badge className="bg-blue-600 text-xs">구체적인 해결 방안</Badge>
                      <Badge className="bg-blue-600 text-xs">측정 가능한 기대 효과</Badge>
                      <Badge className="bg-blue-600 text-xs">상세한 리소스 계획</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t border-slate-800 pt-6">
                <Button 
                  variant="outline" 
                  className="w-full border-slate-700 bg-slate-800 text-white hover:bg-slate-700" 
                  onClick={() => setActiveTab("form")}
                >
                  발제 작성하기
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="success">
            <Card className="bg-slate-900 border-slate-800 shadow-xl">
              <CardHeader className="border-b border-slate-800">
                <CardTitle className="flex items-center gap-2 text-blue-400">
                  <CheckCircle2 className="h-5 w-5" />
                  발제가 성공적으로 제출되었습니다
                </CardTitle>
                <CardDescription className="text-gray-400">
                  제출해주신 발제는 담당자가 검토 후 연락드리겠습니다.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="p-8 text-center bg-slate-800 rounded-lg border border-slate-700">
                  <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="h-8 w-8 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-medium text-white mb-2">감사합니다!</h3>
                  <p className="mb-6 text-gray-400">발제가 성공적으로 등록되었습니다</p>
                  <div className="inline-block px-4 py-2 bg-slate-700 rounded-md mb-4">
                    <p className="text-gray-300">발제 번호: <span className="font-medium text-white">{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}</span></p>
                  </div>
                  <p className="text-gray-500 text-sm">영업일 기준 3-5일 내에 검토 결과를 이메일로 안내드립니다.</p>
                </div>
              </CardContent>
              <CardFooter className="border-t border-slate-800 pt-6">
                <Button 
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white" 
                  onClick={resetForm}
                >
                  새 발제 작성하기
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <Toaster />
    </div>
  )
}
