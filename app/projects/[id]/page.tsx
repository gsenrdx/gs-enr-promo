import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// 샘플 프로젝트 데이터
const projects = [
  {
    id: 1,
    title: "에너지 효율화 시스템",
    description: "건물 에너지 사용량을 최적화하는 AI 기반 시스템",
    image: "/placeholder.svg?key=jawaj",
    tags: ["에너지", "AI", "최적화"],
    featured: true,
    fullDescription:
      "이 프로젝트는 건물 내 에너지 사용을 실시간으로 모니터링하고 AI 알고리즘을 통해 최적화하는 시스템을 개발합니다. 냉난방, 조명, 전력 사용 등을 통합적으로 관리하여 에너지 효율을 극대화하고 비용을 절감합니다.",
    painPoints:
      "현재 건물 에너지 관리 시스템은 개별 시스템으로 분리되어 있어 통합적인 최적화가 어렵고, 실시간 대응이 불가능합니다. 또한 에너지 낭비 요소를 자동으로 감지하고 조정하는 기능이 부족합니다.",
    hiddenNeeds:
      "건물 관리자들은 복잡한 시스템을 쉽게 이해하고 제어할 수 있는 직관적인 인터페이스가 필요합니다. 또한 에너지 사용 패턴을 분석하여 장기적인 효율화 전략을 수립할 수 있는 데이터 인사이트가 필요합니다.",
    team: ["김에너지 책임", "박효율 선임", "이시스템 연구원"],
    progress: 65,
  },
]

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const projectId = Number.parseInt(params.id)
  const project = projects.find((p) => p.id === projectId)

  if (!project) {
    return (
      <div className="container pt-24 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">프로젝트를 찾을 수 없습니다</h1>
        <Button asChild>
          <Link href="/projects">프로젝트 목록으로 돌아가기</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="pt-24 pb-12">
      <div className="container">
        <div className="flex items-center gap-2 mb-6">
          <Link href="/projects" className="text-sm text-muted-foreground hover:underline">
            프로젝트
          </Link>
          <span className="text-muted-foreground">/</span>
          <span className="text-sm font-medium">{project.title}</span>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{project.title}</h1>

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>

              <p className="text-muted-foreground text-lg">{project.description}</p>
            </div>

            <div className="flex gap-4 pt-2">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white">
                <Link href={`/propose?project=${project.id}`}>발제하기</Link>
              </Button>
              <Button variant="outline" size="lg">
                문의하기
              </Button>
            </div>
          </div>

          <div className="rounded-xl overflow-hidden shadow-lg bg-muted">
            <img 
              src={project.image || "/placeholder.svg"} 
              alt={project.title} 
              className="w-full h-[300px] object-cover"
            />
          </div>
        </div>
      </div>

      <div className="container mt-12">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="overview">개요</TabsTrigger>
            <TabsTrigger value="insights">인사이트</TabsTrigger>
            <TabsTrigger value="team">팀 구성</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="mt-8">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">프로젝트 개요</h2>
              <p className="text-base leading-relaxed">{project.fullDescription}</p>

              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">진행 상황</h3>
                <div className="w-full bg-muted rounded-full h-4 mb-2">
                  <div className="bg-primary h-4 rounded-full" style={{ width: `${project.progress}%` }}></div>
                </div>
                <p className="text-right text-sm text-muted-foreground">{project.progress}% 완료</p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="insights" className="mt-8">
            <div className="grid gap-8 md:grid-cols-2">
              <Card className="overflow-hidden border-0 shadow-md">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Pain Points</h3>
                  <p className="text-base leading-relaxed">{project.painPoints}</p>
                </CardContent>
              </Card>
              <Card className="overflow-hidden border-0 shadow-md">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Hidden Needs</h3>
                  <p className="text-base leading-relaxed">{project.hiddenNeeds}</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="team" className="mt-8">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">프로젝트 팀</h2>
              <div className="grid gap-4 md:grid-cols-3">
                {project.team.map((member, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 rounded-lg bg-muted">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                      {member.charAt(0)}
                    </div>
                    <span className="font-medium">{member}</span>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
