"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Settings } from "lucide-react";
import type { ReactNode } from "react";

import { ThemeProvider } from "@/components/theme-provider";
import { CollegeProvider } from "@/components/college-provider";
import { AchievementProvider } from "@/components/achievement-provider";
import { NotificationsProvider } from "@/components/notifications-provider";
import { SocketProvider } from "@/components/socket-provider";
import { Toaster } from "@/components/ui/toaster";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { SkipLink } from "@/components/ui/skip-link";
import { NotificationsCenter } from "@/components/notifications-center";
import { EnhancedSearchBar } from "@/components/enhanced-search-bar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ErrorBoundary from "@/components/error-boundary";

const Sidebar = dynamic(() => import("../components/sidebar"), { ssr: false });

const inter = Inter({ subsets: ["latin"] });

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const router = useRouter();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} dark`}>
        <ErrorBoundary>
          <SocketProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem={true} disableTransitionOnChange>
              <CollegeProvider>
                <NotificationsProvider>
                  <AchievementProvider>
                    <SkipLink />
                    <div className="min-h-screen bg-[#0A0C10] flex">
                      <Sidebar />
                      <div className="flex flex-col flex-1 md:pl-64">
                        {/* Header */}
                        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                          <div className="container flex h-14 items-center justify-between">
                            <EnhancedSearchBar className="hidden md:block flex-1" />
                            <nav className="flex items-center space-x-2">
                              <NotificationsCenter />
                              <ThemeToggle />
                              <Button variant="ghost" size="icon" onClick={() => router.push("/settings")}>
                                <Settings className="h-5 w-5" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-full"
                                onClick={() => router.push("/profile")}
                              >
                                <Avatar className="h-8 w-8">
                                  <AvatarImage
                                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-WfbYiJGVKK5x6kLQbs1pKjmnI62hp0.png"
                                    alt="User Avatar"
                                  />
                                  <AvatarFallback>U</AvatarFallback>
                                </Avatar>
                              </Button>
                            </nav>
                          </div>
                        </header>

                        {/* Main Content */}
                        <motion.main
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 20 }}
                          transition={{ duration: 0.3 }}
                          id="main-content"
                          className="flex-1 pt-14"
                        >
                          {children}
                        </motion.main>
                      </div>
                    </div>
                    <Toaster />
                  </AchievementProvider>
                </NotificationsProvider>
              </CollegeProvider>
            </ThemeProvider>
          </SocketProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
