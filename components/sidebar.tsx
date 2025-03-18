"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useCollege } from "./college-provider"
import { useRouter } from "next/navigation"
import {
  LayoutDashboard,
  BookOpen,
  MessageSquare,
  ClipboardCheck,
  Bell,
  BarChart,
  Brain,
  FileText,
  Users,
  CheckSquare,
  Search,
  GraduationCap,
  CalendarDays,
  MapPin,
  Coffee,
  Activity,
  UserCheck,
  Briefcase,
  Network,
  Settings,
  Menu,
  Library,
  School,
  Star,
} from "lucide-react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function Sidebar() {
  const pathname = usePathname()
  const { collegeName } = useCollege()
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const academicRoutes = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/courses", label: "Courses", icon: BookOpen },
    { href: "/chat", label: "Chat", icon: MessageSquare },
    { href: "/attendance", label: "Attendance", icon: ClipboardCheck },
    { href: "/tasks", label: "Tasks", icon: CheckSquare },
    { href: "/notifications", label: "Notifications", icon: Bell },
    { href: "/analytics", label: "Analytics", icon: BarChart },
    { href: "/study-assistant", label: "Study Assistant", icon: Brain },
    { href: "/documents", label: "Collaborative Docs", icon: FileText },
    { href: "/study-rooms", label: "Study Rooms", icon: Users },
    { href: "/plagiarism-checker", label: "Plagiarism Checker", icon: Search },
    { href: "/resource-library", label: "Resource Library", icon: Library },
    { href: "/peer-tutoring", label: "Peer Tutoring", icon: GraduationCap },
  ]

  const communityRoutes = [
    { href: "/events", label: "Events", icon: CalendarDays },
    { href: "/groups", label: "Groups", icon: Users },
    { href: "/tourist-spots", label: "Tourist Spots", icon: MapPin },
    { href: "/food-spots", label: "Food Spots", icon: Coffee },
    { href: "/activities", label: "Activities", icon: Activity },
  ]

  const proRoutes = [
    { href: "/job-board", label: "Job Board", icon: Briefcase, isPro: true },
    { href: "/alumni-network", label: "Alumni Network", icon: Network, isPro: true },
    { href: "/furlong", label: "Furlong", icon: MapPin, isPro: true },
    { href: "/one-on-one", label: "One-on-One", icon: UserCheck, isPro: true },
  ]

  const SidebarContent = (
    <ScrollArea className="flex-1">
      <div className="flex flex-col gap-2 p-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 px-2 py-1.5">
            <School className="h-4 w-4 text-primary" />
            <span className="text-xs font-semibold uppercase text-primary">Academic</span>
          </div>
          {academicRoutes.map((route) => (
            <Button
              key={route.href}
              variant={pathname === route.href ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start transition-colors hover:bg-accent hover:text-accent-foreground",
                pathname === route.href ? "bg-accent text-accent-foreground" : "",
              )}
              onClick={() => {
                router.push(route.href)
                setOpen(false)
              }}
            >
              <route.icon className="mr-2 h-4 w-4" />
              {route.label}
            </Button>
          ))}
        </div>

        <div className="mt-4 flex flex-col gap-2">
          <div className="flex items-center gap-2 px-2 py-1.5">
            <Users className="h-4 w-4 text-primary" />
            <span className="text-xs font-semibold uppercase text-primary">Community</span>
          </div>
          {communityRoutes.map((route) => (
            <Button
              key={route.href}
              variant={pathname === route.href ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start transition-colors hover:bg-accent hover:text-accent-foreground",
                pathname === route.href ? "bg-accent text-accent-foreground" : "",
              )}
              onClick={() => {
                router.push(route.href)
                setOpen(false)
              }}
            >
              <route.icon className="mr-2 h-4 w-4" />
              <span className="flex-1">{route.label}</span>
            </Button>
          ))}
        </div>

        <div className="mt-4 flex flex-col gap-2">
          <div className="flex items-center gap-2 px-2 py-1.5">
            <Star className="h-4 w-4 text-primary" />
            <span className="text-xs font-semibold uppercase text-primary">Pro Features</span>
          </div>
          {proRoutes.map((route) => (
            <Button
              key={route.href}
              variant={pathname === route.href ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start transition-colors hover:bg-accent hover:text-accent-foreground",
                pathname === route.href ? "bg-accent text-accent-foreground" : "",
              )}
              onClick={() => {
                router.push(route.href)
                setOpen(false)
              }}
            >
              <route.icon className="mr-2 h-4 w-4" />
              <span className="flex-1">{route.label}</span>
              <span className="text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 animate-pulse">
                PRO
              </span>
            </Button>
          ))}
        </div>
      </div>
    </ScrollArea>
  )

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
              >
                <div className="flex h-16 items-center border-b px-4">
                  <Link className="flex items-center gap-2 font-semibold" href="/">
                    <div className="h-8 w-24 bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold rounded">
                      ColCord
                    </div>
                  </Link>
                </div>
                {SidebarContent}
              </motion.div>
            )}
          </AnimatePresence>
        </SheetContent>
      </Sheet>
      <div className="hidden md:flex w-64 flex-col fixed inset-y-0 z-30 border-r bg-background">
        <div className="flex h-16 items-center border-b px-6">
          <Link className="flex items-center gap-2 font-semibold" href="/">
            <div className="h-8 w-24 bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold rounded">
              ColCord
            </div>
          </Link>
        </div>
        {SidebarContent}
        <div className="mt-auto p-4 border-t">
          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link href="/settings">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Link>
          </Button>
        </div>
      </div>
    </>
  )
}

