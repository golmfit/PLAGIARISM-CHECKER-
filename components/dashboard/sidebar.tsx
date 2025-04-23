"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, PlusCircle, ImageIcon, Bookmark, Settings } from "lucide-react"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Create",
    href: "/dashboard/create",
    icon: PlusCircle,
  },
  {
    title: "Gallery",
    href: "/dashboard/gallery",
    icon: ImageIcon,
  },
  {
    title: "Saved",
    href: "/dashboard/saved",
    icon: Bookmark,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
]

export default function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
      <nav className="flex items-center justify-center bg-card border border-border rounded-full px-3 py-2 shadow-md">
        {sidebarItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center justify-center w-14 h-14 rounded-full mx-2 transition-colors",
              pathname === item.href
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-primary/5 hover:text-primary",
            )}
            title={item.title}
          >
            <item.icon className="h-6 w-6" />
            <span className="sr-only">{item.title}</span>
          </Link>
        ))}
        <div className="flex items-center justify-center w-14 h-14 rounded-full mx-2">
          <ThemeToggle />
        </div>
      </nav>
    </div>
  )
}
