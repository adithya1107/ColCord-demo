import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { LogoFallback } from "@/components/logo-fallback"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="fixed top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-24 border-2 border-primary flex items-center justify-center text-sm font-bold">
              ColCord
            </div>
            <span className="text-lg font-semibold">ColCord</span>
          </Link>
          <Button asChild>
            <Link href="/sso">Join ColCord</Link>
          </Button>
        </div>
      </header>
      
      <main className="flex-1">
        <section className="space-y-6 pb-8 pt-24 md:pb-12 md:pt-32 lg:py-32">
          <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
            <h1 className="font-bold text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
              College Co-ordination
            </h1>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              Organizing India's College Community
            </p>
            <div className="space-x-4">
              <Button size="lg" asChild>
                <Link href="/sso">Get Started</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#about">Learn More</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="container flex items-center justify-center py-8 md:py-12 lg:py-24">
          <div className="w-full max-w-[800px] h-[400px] border-2 border-primary rounded-lg flex items-center justify-center text-lg font-bold text-primary">
            Students Illustration Placeholder
          </div>
        </section>

        <section id="about" className="container py-8 md:py-12 lg:py-24">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
              About ColCord
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              ColCord is an innovative college engagement platform designed to connect students and professors
              within their respective college communities. By joining ColCord, students can easily interact with
              classmates, participate in discussions, and collaborate on assignments and activities all in one place.
            </p>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              The platform streamlines academic and social engagement by offering features like assignment
              submissions, activity tracking, and real-time communication. ColCord not only enhances student
              engagement but also provides professors with tools to effectively manage their courses and interact
              with students.
            </p>
          </div>
        </section>
      </main>

      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <div className="h-6 w-20 border-2 border-primary flex items-center justify-center text-xs font-bold">
              ColCord
            </div>
            <p className="text-center text-sm leading-loose md:text-left">
              Built by ColCord. The platform for modern college communities.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

