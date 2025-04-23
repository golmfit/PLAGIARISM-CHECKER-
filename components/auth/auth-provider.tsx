"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

type User = {
  id: string
  name: string
  email: string
} | null

type AuthContextType = {
  user: User
  signIn: (email: string, password: string) => Promise<void>
  signUp: (name: string, email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = async () => {
      try {
        // In a real app, you would check session/token validity here
        const storedUser = localStorage.getItem("visionfy_user")
        if (storedUser) {
          setUser(JSON.parse(storedUser))
        }
      } catch (error) {
        console.error("Auth check failed:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const signIn = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // In a real app, you would make an API call here
      // Simulating successful login
      const user = {
        id: "user_" + Math.random().toString(36).substr(2, 9),
        name: email.split("@")[0],
        email,
      }

      setUser(user)
      localStorage.setItem("visionfy_user", JSON.stringify(user))
    } catch (error) {
      console.error("Sign in failed:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const signUp = async (name: string, email: string, password: string) => {
    setIsLoading(true)
    try {
      // In a real app, you would make an API call here
      // Simulating successful registration
      const user = {
        id: "user_" + Math.random().toString(36).substr(2, 9),
        name,
        email,
      }

      setUser(user)
      localStorage.setItem("visionfy_user", JSON.stringify(user))
    } catch (error) {
      console.error("Sign up failed:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const signOut = async () => {
    setIsLoading(true)
    try {
      // In a real app, you would invalidate the session/token here
      setUser(null)
      localStorage.removeItem("visionfy_user")
    } catch (error) {
      console.error("Sign out failed:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return <AuthContext.Provider value={{ user, signIn, signUp, signOut, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
