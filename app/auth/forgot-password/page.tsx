import Link from "next/link"
import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft } from "lucide-react"
import { Label } from "@/components/ui/label"

export const metadata: Metadata = {
  title: "Forgot Password | Visionfy",
  description: "Reset your Visionfy account password",
}

export default function ForgotPasswordPage() {
  return (
    <div className="container relative flex min-h-screen flex-col items-center justify-center">
      <Link
        href="/auth/sign-in"
        className="absolute left-4 top-4 md:left-8 md:top-8 inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background hover:bg-accent hover:text-accent-foreground rounded-md px-4 py-2"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to sign in
      </Link>

      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Forgot password</h1>
          <p className="text-sm text-muted-foreground">
            Enter your email address and we'll send you a link to reset your password
          </p>
        </div>

        <div className="grid gap-6">
          <form>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="name@example.com"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Send reset link
              </Button>
            </div>
          </form>
        </div>

        <p className="px-8 text-center text-sm text-muted-foreground">
          Remember your password?{" "}
          <Link href="/auth/sign-in" className="underline underline-offset-4 hover:text-primary">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
