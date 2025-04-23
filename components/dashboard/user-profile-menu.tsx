"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { LogOut, Settings, User, CreditCard } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function UserProfileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleLogout = () => {
    // Implement logout functionality here
    console.log("Logging out...")
    // Redirect to login page or home page
    window.location.href = "/"
  }

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        className="h-10 w-10 rounded-full overflow-hidden cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2"
        aria-label="User menu"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Avatar className="h-10 w-10">
          <AvatarImage src="/abstract-user.png" alt="User profile" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      </button>

      {isOpen && (
        <div
          ref={menuRef}
          className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-background border border-border z-50"
        >
          <div className="flex items-center gap-2 p-3 border-b border-border">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/abstract-user.png" alt="User profile" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-muted-foreground truncate">john.doe@example.com</p>
            </div>
          </div>

          <div className="py-1">
            <Link
              href="/dashboard"
              className="flex items-center px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
              onClick={() => setIsOpen(false)}
            >
              <User className="mr-2 h-4 w-4" />
              <span>My Profile</span>
            </Link>

            <Link
              href="/dashboard/settings"
              className="flex items-center px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
              onClick={() => setIsOpen(false)}
            >
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </Link>

            <Link
              href="/dashboard/settings?tab=billing"
              className="flex items-center px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
              onClick={() => setIsOpen(false)}
            >
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Billing</span>
            </Link>

            <div className="border-t border-border my-1"></div>

            <button
              onClick={() => {
                handleLogout()
                setIsOpen(false)
              }}
              className="flex w-full items-center px-4 py-2 text-sm text-red-500 hover:bg-accent"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
