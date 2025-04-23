"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"
// Update the import for the ChangePlanModal component to include the new icons
import { User, CreditCard, Moon, Sun, Zap, LogOut, Lock, Trash2, Upload, Camera, Loader2 } from "lucide-react"
import { useTheme } from "next-themes"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { updateUserAvatar } from "@/lib/actions/user-actions"
// Import the ChangePlanModal component at the top of the file with other imports
import ChangePlanModalComponent from "@/components/dashboard/change-plan-modal"

// Predefined avatar options
const predefinedAvatars = [
  "/azure-construct.png",
  "/emerald-lattice.png",
  "/amethyst-construct.png",
  "/crimson-construct.png",
  "/golden-geometric-being.png",
  "/abstract-user.png",
  "/amethyst-shard.png",
  "/azure-geometric-entity.png",
]

interface ChangePlanModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentPlan: string
}

const ChangePlanModal: React.FC<ChangePlanModalProps> = ({ open, onOpenChange, currentPlan }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Change Plan</DialogTitle>
          <DialogDescription>
            You are currently on the <span className="font-medium">{currentPlan}</span> plan. Choose a new plan to
            upgrade or downgrade your features.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {/* Mock Plan Options */}
          <div className="rounded-lg border p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg">Free Plan</h3>
                <p className="text-sm text-muted-foreground">$0/month</p>
              </div>
              <Badge variant="secondary">Free</Badge>
            </div>
          </div>

          <div className="rounded-lg border p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg">Professional Plan</h3>
                <p className="text-sm text-muted-foreground">$24.99/month</p>
              </div>
              <Badge>Recommended</Badge>
            </div>
          </div>

          <div className="rounded-lg border p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg">Enterprise Plan</h3>
                <p className="text-sm text-muted-foreground">$99.99/month</p>
              </div>
              <Badge variant="outline">Enterprise</Badge>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button>Confirm Change</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const [isLoading, setIsLoading] = useState(false)
  const [isPasswordLoading, setIsPasswordLoading] = useState(false)
  const [isAvatarLoading, setIsAvatarLoading] = useState(false)
  const searchParams = useSearchParams()
  const tabParam = searchParams.get("tab")
  const [activeTab, setActiveTab] = useState("general")
  const router = useRouter()
  const [avatarDialogOpen, setAvatarDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [deleteConfirmText, setDeleteConfirmText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [changePlanModalOpen, setChangePlanModalOpen] = useState(false)

  // Mock user data
  const [userData, setUserData] = useState({
    name: "John Doe",
    username: "johndoe",
    email: "john.doe@example.com",
    avatar: "/abstract-user.png",
    plan: "Free",
    usageReset: "May 15, 2025",
    remainingCredits: 143,
    totalCredits: 200,
  })

  // Password form state
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  // Set the active tab based on URL parameter
  useEffect(() => {
    if (tabParam === "billing") {
      setActiveTab("billing")
    } else {
      setActiveTab("general")
    }
  }, [tabParam])

  // Load avatar from localStorage on component mount
  useEffect(() => {
    const savedAvatar = localStorage.getItem("userAvatar")
    if (savedAvatar) {
      setUserData((prevData) => ({
        ...prevData,
        avatar: savedAvatar,
      }))
    } else {
      // Initialize localStorage with the default avatar
      localStorage.setItem("userAvatar", userData.avatar)
    }
  }, [])

  const handleSaveProfile = () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Profile updated",
        description: "Your profile information has been updated successfully.",
      })
    }, 1500)
  }

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate passwords
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "New password and confirmation password must match.",
        variant: "destructive",
      })
      return
    }

    setIsPasswordLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsPasswordLoading(false)
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
      toast({
        title: "Password updated",
        description: "Your password has been changed successfully.",
      })
    }, 1500)
  }

  const handleUpgradeClick = () => {
    router.push("/dashboard/settings?tab=billing")
    setActiveTab("billing")
  }

  const handleSignOut = () => {
    // Implement sign out logic
    router.push("/")
  }

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsAvatarLoading(true)

      try {
        const file = e.target.files[0]

        // Create a form data object to send to the server
        const formData = new FormData()
        formData.append("avatar", file)

        // Call the server action to update the avatar
        const result = await updateUserAvatar(formData)

        if (result.success && result.avatar) {
          // Update local state
          setUserData({
            ...userData,
            avatar: result.avatar,
          })

          // Update localStorage for immediate UI updates across components
          localStorage.setItem("userAvatar", result.avatar)

          // Trigger storage event for other components
          window.dispatchEvent(new Event("storage"))

          toast({
            title: "Profile picture updated",
            description: result.message || "Your profile picture has been updated successfully.",
          })

          setAvatarDialogOpen(false)
        } else {
          toast({
            title: "Failed to update profile picture",
            description: result.error || "An error occurred while updating your profile picture.",
            variant: "destructive",
          })
        }
      } catch (error) {
        console.error("Error updating avatar:", error)
        toast({
          title: "Error",
          description: "An unexpected error occurred while updating your profile picture.",
          variant: "destructive",
        })
      } finally {
        setIsAvatarLoading(false)
      }
    }
  }

  const handleSelectPredefinedAvatar = async (avatarUrl: string) => {
    setIsAvatarLoading(true)

    try {
      // Create a form data object to send to the server
      const formData = new FormData()
      formData.append("avatarUrl", avatarUrl)

      // Call the server action to update the avatar
      const result = await updateUserAvatar(formData)

      if (result.success) {
        // Update local state
        setUserData({
          ...userData,
          avatar: avatarUrl,
        })

        // Update localStorage for immediate UI updates across components
        localStorage.setItem("userAvatar", avatarUrl)

        // Trigger storage event for other components
        window.dispatchEvent(new Event("storage"))

        toast({
          title: "Profile picture updated",
          description: result.message || "Your profile picture has been updated successfully.",
        })

        setAvatarDialogOpen(false)
      } else {
        toast({
          title: "Failed to update profile picture",
          description: result.error || "An error occurred while updating your profile picture.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error updating avatar:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred while updating your profile picture.",
        variant: "destructive",
      })
    } finally {
      setIsAvatarLoading(false)
    }
  }

  const handleDeleteAccount = () => {
    setDeleteDialogOpen(true)
  }

  const confirmDeleteAccount = () => {
    if (deleteConfirmText.toLowerCase() !== "delete") {
      toast({
        title: "Confirmation failed",
        description: "Please type 'delete' to confirm account deletion.",
        variant: "destructive",
      })
      return
    }

    setIsDeleting(true)

    // Simulate API call for account deletion
    setTimeout(() => {
      setIsDeleting(false)
      setDeleteDialogOpen(false)
      setDeleteConfirmText("")

      toast({
        title: "Account deleted",
        description: "Your account has been permanently deleted.",
        variant: "destructive",
      })

      // Redirect to home page after successful deletion
      setTimeout(() => {
        router.push("/")
      }, 2000)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-10 max-w-5xl">
        {/* User Profile Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-4">
            <div className="relative group">
              <Avatar className="h-20 w-20 border cursor-pointer">
                <AvatarImage src={userData.avatar || "/placeholder.svg"} alt="Profile picture" />
                <AvatarFallback>
                  {userData.name.charAt(0)}
                  {userData.name.split(" ")[1]?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div
                className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                onClick={() => setAvatarDialogOpen(true)}
              >
                <Camera className="h-6 w-6 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold">{userData.username}</h1>
              <p className="text-muted-foreground">{userData.email}</p>
            </div>
          </div>
          <Button variant="outline" className="gap-2" onClick={handleSignOut}>
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>

        <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid grid-cols-2 w-full md:w-auto">
            <TabsTrigger value="general" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>General</span>
            </TabsTrigger>
            <TabsTrigger value="billing" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              <span>Billing</span>
            </TabsTrigger>
          </TabsList>

          {/* General Tab */}
          <TabsContent value="general" className="space-y-6">
            {/* Subscription Card */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Subscription</CardTitle>
                <CardDescription>Your current plan and usage information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-sm font-medium">Try Visiomancer for free</p>
                      <p className="text-xs text-muted-foreground">Usage reset on {userData.usageReset}</p>
                    </div>
                    <Badge variant="outline" className="bg-primary/10">
                      {userData.plan} Plan
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Image Generations</span>
                      <span className="font-medium">
                        {userData.remainingCredits} / {userData.totalCredits}
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full bg-primary"
                        style={{ width: `${(userData.remainingCredits / userData.totalCredits) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="relative overflow-hidden rounded-lg border">
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-accent/10 to-transparent" />
                  <div className="relative p-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div>
                        <h3 className="font-semibold text-lg mb-1">Upgrade for faster generations & more credits</h3>
                        <p className="text-sm text-muted-foreground">
                          Get access to premium features and higher quality images
                        </p>
                      </div>
                      <Button onClick={handleUpgradeClick} className="gap-2">
                        <Zap className="h-4 w-4" />
                        Upgrade Plan
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Account Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Account</CardTitle>
                <CardDescription>Update your account information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="username">Username</Label>
                    <div className="flex items-center gap-2">
                      <Input id="username" defaultValue={userData.username} />
                      <Button variant="outline" size="sm">
                        Change
                      </Button>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="flex items-center gap-2">
                      <Input id="email" type="email" defaultValue={userData.email} />
                      <Button variant="outline" size="sm">
                        Change
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Password Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  Password
                </CardTitle>
                <CardDescription>Change your password to keep your account secure</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePasswordChange} className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input
                      id="current-password"
                      type="password"
                      value={passwordForm.currentPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input
                      id="new-password"
                      type="password"
                      value={passwordForm.newPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      value={passwordForm.confirmPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                      required
                    />
                  </div>
                  <Button type="submit" disabled={isPasswordLoading} className="w-full">
                    {isPasswordLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Updating Password...
                      </>
                    ) : (
                      "Update Password"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Theme Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Theme</CardTitle>
                <CardDescription>Customize how the application looks on your device</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-col space-y-3">
                    <Label>Theme Selection</Label>
                    <div className="flex items-center space-x-4">
                      <Button
                        variant={theme === "light" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setTheme("light")}
                        className="gap-2"
                      >
                        <Sun className="h-4 w-4" />
                        Light
                      </Button>
                      <Button
                        variant={theme === "dark" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setTheme("dark")}
                        className="gap-2"
                      >
                        <Moon className="h-4 w-4" />
                        Dark
                      </Button>
                      <Button
                        variant={theme === "system" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setTheme("system")}
                        className="gap-2"
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                          />
                        </svg>
                        System
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Delete Account */}
            <Card className="border-destructive/20">
              <CardHeader>
                <CardTitle className="text-destructive flex items-center gap-2">
                  <Trash2 className="h-4 w-4" />
                  Delete Account
                </CardTitle>
                <CardDescription>
                  Permanently delete your account and all associated data. This action cannot be undone.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Once you delete your account, all of your data including generated images, prompts, and personal
                  information will be permanently removed from our systems.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="destructive" onClick={handleDeleteAccount}>
                  Delete Account
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Billing Tab */}
          <TabsContent value="billing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Current Plan</CardTitle>
                <CardDescription>Manage your subscription and billing information.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-lg border p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">Professional Plan</h3>
                      <p className="text-sm text-muted-foreground">$24.99/month</p>
                    </div>
                    <Badge>Current Plan</Badge>
                  </div>
                  <Separator className="my-4" />
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-primary" />
                      <span className="text-sm">200 image generations per month</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-primary" />
                      <span className="text-sm">Mix of standard and high resolution</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-primary" />
                      <span className="text-sm">Priority generation queue</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-primary" />
                      <span className="text-sm">Advanced prompt tools</span>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium">Renews on May 15, 2025</p>
                      <p className="text-xs text-muted-foreground">143 generations remaining this month</p>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => setChangePlanModalOpen(true)}>
                      Change Plan
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">Payment Method</h3>
                  <div className="rounded-lg border p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="rounded-md bg-muted p-2">
                          <CreditCard className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium">•••• •••• •••• 4242</p>
                          <p className="text-xs text-muted-foreground">Expires 12/2025</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col items-start gap-2">
                <Button variant="outline" className="w-full">
                  View Billing History
                </Button>
                <Button variant="outline" className="w-full text-destructive hover:text-destructive">
                  Cancel Subscription
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Usage</CardTitle>
                <CardDescription>Monitor your usage for the current billing cycle.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Image Generations</span>
                      <span className="font-medium">57 / 200</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: "28.5%" }}></div>
                    </div>
                    <p className="text-xs text-muted-foreground">143 generations remaining until May 15, 2025</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>High Resolution Images</span>
                      <span className="font-medium">12 / 50</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: "24%" }}></div>
                    </div>
                    <p className="text-xs text-muted-foreground">38 high-res generations remaining</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Download Usage Report
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Avatar Selection Dialog */}
      <Dialog open={avatarDialogOpen} onOpenChange={setAvatarDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Change Profile Picture</DialogTitle>
            <DialogDescription>Choose from our predefined avatars or upload your own custom image.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {isAvatarLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-50 rounded-md">
                <div className="flex flex-col items-center gap-2">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <p className="text-sm text-muted-foreground">Updating profile picture...</p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-4 gap-4">
              {predefinedAvatars.map((avatar, index) => (
                <div
                  key={index}
                  className={`relative aspect-square rounded-md overflow-hidden border cursor-pointer transition-all hover:scale-105 hover:shadow-md ${isAvatarLoading ? "opacity-50 pointer-events-none" : ""}`}
                  onClick={() => handleSelectPredefinedAvatar(avatar)}
                >
                  <img
                    src={avatar || "/placeholder.svg"}
                    alt={`Avatar option ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {userData.avatar === avatar && (
                    <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                      <div className="bg-primary text-primary-foreground rounded-full p-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <Separator className="my-4" />

            <div className="space-y-2">
              <Label htmlFor="custom-avatar">Or upload your own</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="custom-avatar"
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="flex-1"
                  disabled={isAvatarLoading}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => document.getElementById("custom-avatar")?.click()}
                  disabled={isAvatarLoading}
                >
                  <Upload className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Supported formats: JPEG, PNG, GIF. Maximum file size: 5MB.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Account Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-destructive flex items-center gap-2">
              <Trash2 className="h-5 w-5" />
              Delete Account
            </DialogTitle>
            <DialogDescription>
              This action cannot be undone. Your account and all associated data will be permanently deleted.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="bg-destructive/10 text-destructive rounded-md p-4 text-sm">
              <p>Please read carefully:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>All your generated images will be deleted</li>
                <li>Your personal information will be removed from our systems</li>
                <li>Your subscription will be canceled</li>
                <li>This action is permanent and cannot be reversed</li>
              </ul>
            </div>

            <div className="space-y-2">
              <Label htmlFor="delete-confirm" className="text-destructive font-medium">
                Type "delete" to confirm
              </Label>
              <Input
                id="delete-confirm"
                value={deleteConfirmText}
                onChange={(e) => setDeleteConfirmText(e.target.value)}
                placeholder="delete"
                className="border-destructive/50 focus-visible:ring-destructive"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)} disabled={isDeleting}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDeleteAccount}
              disabled={deleteConfirmText.toLowerCase() !== "delete" || isDeleting}
            >
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete Account"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Change Plan Modal */}
      <ChangePlanModalComponent
        open={changePlanModalOpen}
        onOpenChange={setChangePlanModalOpen}
        currentPlan="Professional"
      />
    </div>
  )
}
