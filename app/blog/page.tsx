import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, User, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Blog post data
const blogPosts = [
  {
    id: "ai-art-evolution",
    title: "The Evolution of AI Art: From GANs to Diffusion Models",
    excerpt:
      "Explore the fascinating journey of AI art generation, from early GAN experiments to today's sophisticated diffusion models that power platforms like Visionfy.",
    coverImage: "/digital-genesis.png",
    category: "Technology",
    author: "Dr. Sarah Chen",
    authorImage: "/placeholder.svg?height=100&width=100&query=professional headshot of female tech executive",
    date: "May 15, 2023",
    readTime: "8 min read",
    featured: true,
  },
  {
    id: "prompt-engineering",
    title: "Mastering Prompt Engineering: Tips for Better AI-Generated Images",
    excerpt:
      "Learn the art and science of crafting effective prompts that yield stunning results. This guide covers advanced techniques used by professionals.",
    coverImage: "/placeholder.svg?height=600&width=1200&query=person writing creative prompts at computer",
    category: "Tutorials",
    author: "Michael Rodriguez",
    authorImage: "/placeholder.svg?height=100&width=100&query=professional headshot of male tech expert",
    date: "June 3, 2023",
    readTime: "12 min read",
  },
  {
    id: "creative-workflows",
    title: "Integrating AI Image Generation into Creative Workflows",
    excerpt:
      "Discover how designers, marketers, and content creators are incorporating AI-generated imagery into their professional workflows for better results.",
    coverImage: "/placeholder.svg?height=600&width=1200&query=creative professional using tablet with AI art",
    category: "Case Studies",
    author: "Emily Johnson",
    authorImage: "/placeholder.svg?height=100&width=100&query=professional headshot of female creative director",
    date: "July 12, 2023",
    readTime: "10 min read",
  },
  {
    id: "ethical-considerations",
    title: "Ethical Considerations in AI Art: Navigating the New Frontier",
    excerpt:
      "As AI art becomes mainstream, important questions about originality, copyright, and ethical usage arise. We explore the complex landscape of AI ethics.",
    coverImage: "/placeholder.svg?height=600&width=1200&query=abstract representation of ethics and technology",
    category: "Perspectives",
    author: "Dr. James Wilson",
    authorImage: "/placeholder.svg?height=100&width=100&query=professional headshot of ethics professor",
    date: "August 5, 2023",
    readTime: "15 min read",
  },
  {
    id: "future-of-creativity",
    title: "The Future of Creativity: Human-AI Collaboration",
    excerpt:
      "Rather than replacing human creativity, AI is opening new collaborative possibilities. Explore how this partnership is reshaping creative industries.",
    coverImage: "/placeholder.svg?height=600&width=1200&query=human hand and robot hand creating art together",
    category: "Trends",
    author: "Alex Rivera",
    authorImage: "/placeholder.svg?height=100&width=100&query=professional headshot of innovation researcher",
    date: "September 20, 2023",
    readTime: "9 min read",
  },
  {
    id: "visionfy-update",
    title: "Introducing New Features: Style Customization and Batch Processing",
    excerpt:
      "We're excited to announce major updates to Visionfy, including advanced style controls and the ability to generate multiple variations simultaneously.",
    coverImage: "/placeholder.svg?height=600&width=1200&query=software interface showing image generation options",
    category: "Product Updates",
    author: "The Visionfy Team",
    authorImage: "/placeholder.svg?height=100&width=100&query=tech company logo",
    date: "October 8, 2023",
    readTime: "5 min read",
  },
]

export default function BlogPage() {
  // Extract featured post
  const featuredPost = blogPosts.find((post) => post.featured)
  const regularPosts = blogPosts.filter((post) => !post.featured)

  return (
    <div className="relative min-h-screen">
      {/* Background gradients */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute right-0 top-0 h-[800px] w-[800px] bg-purple-500/10 blur-[120px]" />
        <div className="absolute left-0 bottom-0 h-[800px] w-[800px] bg-pink-500/10 blur-[120px]" />
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 bg-blue-500/5 blur-[120px]" />
      </div>

      <div className="relative z-10">
        <Navbar />

        <main className="container py-24">
          {/* Blog Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl font-bold mb-4">Visionfy Blog</h1>
            <p className="text-muted-foreground text-lg">
              Insights, tutorials, and updates from the world of AI-powered image generation.
            </p>
          </div>

          {/* Featured Post */}
          {featuredPost && (
            <div className="mb-16">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="relative rounded-xl overflow-hidden aspect-video">
                  <Image
                    src={featuredPost.coverImage || "/placeholder.svg"}
                    alt={featuredPost.title}
                    width={1200}
                    height={600}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                      {featuredPost.category}
                    </span>
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-secondary ml-2">
                      Featured
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold mb-3">{featuredPost.title}</h2>
                  <p className="text-muted-foreground mb-4">{featuredPost.excerpt}</p>
                  <div className="flex items-center mb-6">
                    <div className="w-8 h-8 rounded-full overflow-hidden mr-3">
                      <Image
                        src={featuredPost.authorImage || "/placeholder.svg"}
                        alt={featuredPost.author}
                        width={100}
                        height={100}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-sm">
                      <p className="font-medium">{featuredPost.author}</p>
                      <div className="flex items-center text-muted-foreground">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span className="mr-3">{featuredPost.date}</span>
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{featuredPost.readTime}</span>
                      </div>
                    </div>
                  </div>
                  <Button asChild>
                    <Link href={`/blog/${featuredPost.id}`}>
                      Read Article
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Regular Posts */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post) => (
              <div
                key={post.id}
                className="bg-card border rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="relative aspect-video">
                  <Image
                    src={post.coverImage || "/placeholder.svg"}
                    alt={post.title}
                    width={600}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="mb-3">
                    <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                      {post.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{post.author}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{post.date}</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Link href={`/blog/${post.id}`} className="text-sm font-medium text-primary hover:underline">
                      Read more →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Newsletter Signup */}
          <div className="mt-20 bg-muted/30 rounded-xl p-8 text-center max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
            <p className="text-muted-foreground mb-6">
              Subscribe to our newsletter to receive the latest articles, tutorials, and product updates.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              <Button>Subscribe</Button>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  )
}
