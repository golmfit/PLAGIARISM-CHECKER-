"use client"

import React from "react"
import Link from "next/link"
import { LogOut, CreditCard, User, Sparkles } from "lucide-react"
import DashboardSidebar from "@/components/dashboard/sidebar"
import { FavoritesProvider } from "@/components/favorites/favorites-provider"
import { useTheme } from "next-themes"
import { getUserAvatar } from "@/lib/actions/user-actions"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const { theme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  const [userAvatar, setUserAvatar] = React.useState<string | null>(null)

  // Ensure component is mounted to avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true)

    // Try to get avatar from localStorage first for immediate display
    const localAvatar = localStorage.getItem("userAvatar")
    if (localAvatar) {
      setUserAvatar(localAvatar)
    }

    // Then fetch the latest avatar from the backend
    const fetchAvatar = async () => {
      try {
        const avatarUrl = await getUserAvatar()
        if (avatarUrl) {
          setUserAvatar(avatarUrl)
          // Update localStorage with the latest avatar from the backend
          localStorage.setItem("userAvatar", avatarUrl)
        }
      } catch (error) {
        console.error("Error fetching user avatar:", error)
      }
    }

    fetchAvatar()
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleLogout = () => {
    console.log("Logging out")
    // Redirect to home page
    window.location.href = "/"
  }

  // Close menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest(".profile-menu") && !target.closest(".profile-button")) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Check for avatar updates in localStorage
  React.useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "userAvatar" && event.newValue) {
        setUserAvatar(event.newValue)
      }
    }

    const handleCustomStorageEvent = () => {
      const newAvatar = localStorage.getItem("userAvatar")
      if (newAvatar) {
        setUserAvatar(newAvatar)
      }
    }

    window.addEventListener("storage", handleStorageChange)
    window.addEventListener("storage", handleCustomStorageEvent as EventListener)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener("storage", handleCustomStorageEvent as EventListener)
    }
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <FavoritesProvider>
        {/* Logo and Profile */}
        <div className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-4">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent flex items-center">
              Visi
              <Sparkles className="h-4 w-4 mx-0.5 text-purple-400" />
              nfy
            </span>
          </Link>

          <div className="relative">
            {/* Profile Button */}
            <button
              onClick={toggleMenu}
              className="profile-button h-10 w-10 rounded-full overflow-hidden cursor-pointer focus:outline-none hover:ring-2 hover:ring-purple-400 focus:ring-2 focus:ring-purple-400"
            >
              <img
                src={userAvatar || "/abstract-user.png"}
                alt="User profile"
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "/abstract-user.png"
                }}
              />
            </button>

            {/* Dropdown Menu */}
            {mounted && isMenuOpen && (
              <div className="profile-menu absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 dark:ring-white dark:ring-opacity-10 z-50">
                <div className="py-1">
                  <a
                    href="/dashboard/settings"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <User className="mr-2 h-4 w-4" />
                    My Profile
                  </a>

                  <a
                    href="/dashboard/settings?tab=billing"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <CreditCard className="mr-2 h-4 w-4" />
                    Billing
                  </a>

                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <DashboardSidebar />

        {/* Main Content */}
        <main className="pt-28 px-4 pb-6">{children}</main>
      </FavoritesProvider>
    </div>
  )
}
