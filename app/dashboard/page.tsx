import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusCircle, ImageIcon, Zap, Bookmark } from "lucide-react"
import Link from "next/link"

// This is a server component, so we'll use a client component for the recent images section
import RecentCreations from "@/components/dashboard/recent-creations"

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Link href="/dashboard/create">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Creation
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Images</CardTitle>
            <ImageIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">127</div>
            <p className="text-xs text-muted-foreground">+5 from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Credits Remaining</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">243</div>
            <p className="text-xs text-muted-foreground">Pro plan: 500/month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saved Images</CardTitle>
            <Bookmark className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">36</div>
            <p className="text-xs text-muted-foreground">In collections</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Creations</CardTitle>
            <CardDescription>Your latest generated images</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentCreations />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Popular Prompts</CardTitle>
            <CardDescription>Trending prompts to try</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                "A cyberpunk cityscape at night with neon lights",
                "Mystical forest with glowing mushrooms and fairies",
                "Underwater ancient ruins with mermaids",
                "Steampunk airship flying through clouds",
                "Futuristic space station orbiting a ringed planet",
              ].map((prompt, i) => (
                <div key={i} className="flex items-center justify-between">
                  <p className="text-sm">{prompt}</p>
                  <Button variant="ghost" size="sm">
                    <PlusCircle className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
