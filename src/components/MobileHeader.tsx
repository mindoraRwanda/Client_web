'use client';

import { Brain, Menu, LogOut, Home, Brain as BrainIcon, BookOpen, BarChart, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";



export function MobileHeader() {
  const pathname = usePathname();
  const router = useRouter();


  const handleLogout = () => {
    localStorage.removeItem('mindora_token');
    localStorage.removeItem('mindora_user');
    localStorage.removeItem('mindora_user_profile');
    router.push('/login');
  };


  return (
    <header className="lg:hidden border-b bg-white dark:bg-slate-900 sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <Brain className="w-8 h-8 text-purple-600 dark:text-purple-400" />
          <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
            Mindora
          </span>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72">
            <div className="flex flex-col h-full">
              <div className="flex items-center gap-2 mb-8">
                <Brain className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
                  Mindora
                </span>
              </div>

              <nav className="flex-1 space-y-1">
                <Link
                  href="/dashboard"
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                    pathname === "/dashboard"
                      ? "bg-purple-50 text-purple-600 dark:bg-slate-800 dark:text-purple-400"
                      : "text-slate-600 hover:bg-purple-50 hover:text-purple-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-purple-400"
                  )}
                >
                  <Home className="h-5 w-5" />
                  <span>Dashboard</span>
                </Link>
                <Link
                  href="/assesments"
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                    pathname === "/assesments"
                      ? "bg-purple-50 text-purple-600 dark:bg-slate-800 dark:text-purple-400"
                      : "text-slate-600 hover:bg-purple-50 hover:text-purple-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-purple-400"
                  )}
                >
                  <Zap className="h-5 w-5" />
                  <span>Assessment</span>
                </Link>
                <Link
                  href="/exercises"
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                    pathname === "/exercises"
                      ? "bg-purple-50 text-purple-600 dark:bg-slate-800 dark:text-purple-400"
                      : "text-slate-600 hover:bg-purple-50 hover:text-purple-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-purple-400"
                  )}
                >
                  <BrainIcon className="h-5 w-5" />
                  <span>Exercises</span>
                </Link>
                <Link
                  href="/journal"
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                    pathname === "/journal"
                      ? "bg-purple-50 text-purple-600 dark:bg-slate-800 dark:text-purple-400"
                      : "text-slate-600 hover:bg-purple-50 hover:text-purple-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-purple-400"
                  )}
                >
                  <BookOpen className="h-5 w-5" />
                  <span>Journal</span>
                </Link>
                <Link
                  href="/progress"
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                    pathname === "/progress"
                      ? "bg-purple-50 text-purple-600 dark:bg-slate-800 dark:text-purple-400"
                      : "text-slate-600 hover:bg-purple-50 hover:text-purple-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-purple-400"
                  )}
                >
                  <BarChart className="h-5 w-5" />
                  <span>Progress</span>
                </Link>
              </nav>

              <div className="border-t pt-4 mt-4">
                <Button variant="ghost"
                  onClick={handleLogout}
                 className="w-full justify-start gap-2 text-red-600 dark:text-red-400">
                  <LogOut className="h-5 w-5" />
                  <span>Log out</span>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}