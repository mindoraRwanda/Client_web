'use client';

import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  BarChart,
  Brain,
  BookOpen,
  Settings,
  LogOut,
  User,
  Home,
  Zap
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";


interface UserData {
  firstName?: string;
  lastName?: string;
  email: string;
  username?: string;
  profile?: string;
  id?: string;
}



const navigationItems = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Assessment', href: '/assesments', icon: Zap },
  { name: 'Exercises', href: '/exercises', icon: Brain },
  { name: 'Journal', href: '/journal', icon: BookOpen },
  { name: 'Progress', href: '/progress', icon: BarChart },
] as const;

export function SideNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('mindora_user');
    if (storedUser) {
      try {
        setUserData(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('mindora_token');
    localStorage.removeItem('mindora_user');
    localStorage.removeItem('mindora_user_profile');
    router.push('/login');
  };

  const getUserName = () => {
    if (userData?.firstName && userData?.lastName) {
      return `${userData.firstName} ${userData.lastName}`;
    } else if (userData?.username) {
      return userData.username;
    } else if (userData?.email) {
      return userData.email.split('@')[0];
    }
    return 'User';
  };

    const getUserInitials = () => {
    if (userData?.firstName && userData?.lastName) {
      return `${userData.firstName[0]}${userData.lastName[0]}`;
    } else if (userData?.username) {
      return userData.username[0].toUpperCase();
    } else if (userData?.email) {
      return userData.email[0].toUpperCase();
    }
    return 'U';
  };



  return (
    <aside className="hidden lg:flex flex-col fixed left-0 top-0 h-screen w-64 border-r bg-white dark:bg-slate-900 p-6">
      <div className="flex items-center gap-2 mb-8">
        <Brain className="w-8 h-8 text-purple-600 dark:text-purple-400" />
        <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
          Mindora
        </span>
      </div>

      <nav className="flex-1 space-y-1">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                isActive 
                  ? "bg-purple-50 text-purple-600 dark:bg-slate-800 dark:text-purple-400"
                  : "text-slate-600 hover:bg-purple-50 hover:text-purple-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-purple-400"
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t pt-4 mt-4">
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full justify-start gap-2 px-3 py-2.5 rounded-lg font-medium transition-colors hover:bg-purple-50 hover:text-purple-600 dark:hover:bg-slate-800 dark:hover:text-purple-400">
                <Avatar className="h-6 w-6 mr-2">
                  <AvatarImage src={userData?.profile || ''} />
                  <AvatarFallback className="bg-gradient-to-tr from-purple-600 to-pink-500 text-white text-xs">
                    {getUserInitials()}
                  </AvatarFallback>
                </Avatar>
                <span className="truncate">{getUserName()}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem asChild>
                <Link href="/profile" className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings" className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="text-red-600 dark:text-red-400 cursor-pointer"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
      </div>
    </aside>
  );
}