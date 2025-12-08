"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import { getMockSubjects, getMockDepartmentById } from "@/lib/mock-data"
import { useRouter, useSearchParams } from "next/navigation"
import { Suspense, useEffect } from "react"

// PDF 5枚目 (閲覧画面) のデザインを適用
function SubjectsContent() {
  const searchParams = useSearchParams()
  const departmentId = searchParams.get("department")
  const router = useRouter()

  useEffect(() => {
    if (!departmentId) {
      router.push("/study/faculties")
    }
  }, [departmentId, router])

  if (!departmentId) return null

  const department = getMockDepartmentById(departmentId)
  const subjects = getMockSubjects(departmentId)

  return (
    <div className="flex flex-col min-h-svh bg-background">
      
      {/* PDFの青いヘッダー */}
      <header className="bg-primary text-primary-foreground shadow-md sticky top-0 z-10">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Button variant="ghost" size="icon" href={`/study/departments?faculty=${department?.faculty_id}`} className="hover:bg-primary/80">
            <ChevronLeft className="h-6 w-6" />
            <span className="sr-only">戻る</span>
          </Button>
          <div className="text-center absolute left-1/2 -translate-x-1/2">
            <h1 className="text-xl font-bold">
              {department?.name}
            </h1>
          </div>
          <div></div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="container mx-auto flex flex-1 flex-col p-4 py-8">
        <div className="w-full max-w-md mx-auto space-y-6">
          
          <h2 className="text-xl font-semibold text-center text-foreground">
            科目を選んでください
          </h2>

          <div className="flex flex-col gap-4">
            {subjects.map((subject) => (
              <Button
                key={subject.id}
                variant="secondary" // PDFのグレーボタン (#E0E0E0)
                className="w-full justify-start"
                size="default" // h-14
                href={`/study/professors?subject=${subject.id}`}
              >
                {subject.name}
              </Button>
            ))}
          </div>
          
        </div>
      </main>
    </div>
  )
}

export default function SubjectsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SubjectsContent />
    </Suspense>
  )
}