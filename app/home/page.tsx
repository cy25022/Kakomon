// al25133/kakomon/Kakomon-5b576818e89f5e0049ab3ff32aa56ea8dec4e81a/app/home/page.tsx
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { BookOpen, Share2, User, Settings } from "lucide-react"

export default async function HomePage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", data.user.id).single()

  return (
    <div className="min-h-svh bg-gradient-to-br from-background to-muted">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          {/* PDF  のデザインに合わせて中央寄せにする場合 */}
          <div className="w-10"></div> {/* 左側のスペーサー */}
          <h1 className="text-xl font-bold text-center">過去問共有</h1>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/account">
                <User className="h-5 w-5" />
                <span className="sr-only">アカウント</span>
              </Link>
            </Button>
            {/* 設定ボタンはPDFにないが、アカウントページ から遷移できるため削除しても良い */}
          </div>
        </div>
      </header>

      <main className="container px-4 py-8">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold mb-2">ようこそ、{profile?.display_name || "ゲスト"}さん</h2>
          <p className="text-muted-foreground">何をしますか？</p>
        </div>

        {/* PDFのデザイン  に合わせてボタンを配置 */}
        <div className="grid gap-4 max-w-sm mx-auto">
          <Button asChild className="w-full" size="lg">
            <Link href="/study/faculties">
              <BookOpen className="h-5 w-5 mr-2" />
              閲覧する (勉強する)
            </Link>
          </Button>
          
          <Button asChild className="w-full" size="lg" variant="secondary">
            <Link href="/share">
              <Share2 className="h-5 w-5 mr-2" />
              共有する (投稿する)
            </Link>
          </Button>
          
          {/* PDF [cite: 7, 44] にある「コース」や「学部・専攻」 [cite: 5, 38] ボタンもここに追加可能 */}
          {/* 例:
          <Button asChild className="w-full" size="lg" variant="outline">
            <Link href="/study/faculties">
              学部・専攻から探す
            </Link>
          </Button>
          */}
        </div>
      </main>
    </div>
  )
}
