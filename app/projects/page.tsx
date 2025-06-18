import { ProjectGallery } from "@/components/project-gallery"

export default function ProjectsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <section className="container py-12 md:py-24">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">프로젝트 갤러리</h1>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              GS E&R 52g Unit에서 진행 중인 모든 프로젝트를 살펴보세요.
            </p>
          </div>
        </div>

        <ProjectGallery />
      </section>
    </div>
  )
}
