"use client"

import { Check, HelpCircle, X, Star, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// Update the plans array to include annual pricing
const plans = [
  {
    name: "Free",
    price: "$0",
    annualPrice: "$0",
    description: "Try out our platform with no commitment",
    features: [
      "5 image generations per month",
      "Standard resolution (1024×1024)",
      "Basic editing tools",
      "Watermarked downloads",
    ],
    popular: false,
    cta: "Get Started",
    ctaVariant: "outline" as const,
    tooltips: {
      "5 image generations per month": "Generate up to 5 high-quality AI images each month",
    },
    testimonials: [
      {
        name: "Alex Chen",
        role: "Hobbyist Artist",
        avatar: "/testimonials/alex.jpg",
        quote:
          "I was skeptical about AI art, but the free tier let me experiment without any commitment. Now I'm hooked!",
        rating: 5,
      },
      {
        name: "Jamie Rodriguez",
        role: "Student",
        avatar: "/testimonials/jamie.jpg",
        quote:
          "Perfect for my school projects. I can quickly generate concept art without spending money from my tight student budget.",
        rating: 4,
      },
    ],
  },
  {
    name: "Basic",
    price: "$4.99",
    annualPrice: "$47.90",
    description: "Perfect for hobbyists and casual creators",
    features: [
      "50 image generations per month",
      "Standard resolution (1024×1024)",
      "No watermarks",
      "Download in multiple formats",
      "Basic organization tools",
      "Email support",
    ],
    popular: false,
    cta: "Subscribe Now",
    ctaVariant: "outline" as const,
    tooltips: {
      "Download in multiple formats": "Export as PNG, JPG, or WebP",
      "Basic organization tools": "Create collections and organize your images",
    },
    testimonials: [
      {
        name: "Sarah Johnson",
        role: "Content Creator",
        avatar: "/testimonials/sarah.jpg",
        quote:
          "The Basic plan gives me enough images for my blog and social media. Being able to download without watermarks at this price point is a steal!",
        rating: 5,
      },
      {
        name: "Michael Torres",
        role: "Indie Game Developer",
        avatar: "/testimonials/michael.jpg",
        quote:
          "I use the Basic plan for concept art and prototyping. The organization tools help me keep track of different game assets and iterations.",
        rating: 5,
      },
    ],
  },
  {
    name: "Professional",
    price: "$24.99",
    annualPrice: "$239.90",
    description: "Ideal for content creators and artists",
    features: [
      "200 image generations per month",
      "Mix of standard and high resolution",
      "Priority generation queue",
      "Advanced prompt tools",
      "Priority support",
      "Commercial usage rights",
    ],
    popular: true,
    cta: "Choose Professional",
    ctaVariant: "default" as const,
    tooltips: {
      "Mix of standard and high resolution": "150 standard (1024×1024) and 50 high-res (1024×1792) images",
      "Advanced prompt tools": "Prompt history, templates, and AI-assisted prompt enhancement",
    },
    testimonials: [
      {
        name: "Emily Zhang",
        role: "Digital Artist & Illustrator",
        avatar: "/testimonials/emily.jpg",
        quote:
          "The Professional plan revolutionized my workflow. The high-res images are perfect for client work, and the advanced prompt tools help me achieve consistent styles.",
        rating: 5,
      },
      {
        name: "David Wilson",
        role: "Marketing Agency Owner",
        avatar: "/testimonials/david.jpg",
        quote: "We've cut our image creation time by 70% while maintaining high quality for our clients.",
        rating: 5,
      },
    ],
  },
  {
    name: "Business",
    price: "$79.99",
    annualPrice: "$767.90",
    description: "For professional studios and businesses",
    features: [
      "500 image generations per month",
      "Unlimited high resolution images",
      "Premium support",
      "Bulk image generation",
      "Commercial usage rights",
      "Extended storage",
    ],
    popular: false,
    cta: "Contact Sales",
    ctaVariant: "outline" as const,
    tooltips: {
      "Unlimited high resolution images": "Use your entire quota for high-res (1024×1792) images if needed",
      "Premium support": "Get faster response times and dedicated assistance",
      "Bulk image generation": "Generate multiple images in batches for efficiency",
      "Extended storage": "Keep your generated images for longer periods",
    },
    testimonials: [
      {
        name: "Jennifer Patel",
        role: "Creative Director, DesignHub Studios",
        avatar: "/testimonials/jennifer.jpg",
        quote:
          "The Business plan has transformed our production pipeline. The unlimited high-res images and bulk generation features have been game-changers for our workflow.",
        rating: 5,
      },
      {
        name: "Robert Kang",
        role: "Product Manager, TechVision Inc.",
        avatar: "/testimonials/robert.jpg",
        quote:
          "The premium support has been invaluable. They helped us optimize our prompts for our specific industry needs and the extended storage helps us maintain our image library.",
        rating: 5,
      },
    ],
  },
]

// Update the feature categories to remove the mentioned features
const featureCategories = [
  {
    name: "Image Generation",
    features: [
      {
        name: "Monthly generations",
        tooltip: "Number of images you can generate each month",
        values: {
          Free: "5",
          Basic: "50",
          Professional: "200",
          Business: "500",
        },
      },
      {
        name: "Standard resolution (1024×1024)",
        tooltip: "Generate images at 1024×1024 resolution",
        values: {
          Free: true,
          Basic: true,
          Professional: true,
          Business: true,
        },
      },
      {
        name: "High resolution (1024×1792)",
        tooltip: "Generate images at higher resolutions for more detail",
        values: {
          Free: false,
          Basic: false,
          Professional: "50 included",
          Business: "Unlimited",
        },
      },
      {
        name: "Priority generation",
        tooltip: "Your images are generated before non-priority users",
        values: {
          Free: false,
          Basic: false,
          Professional: true,
          Business: true,
        },
      },
      {
        name: "Batch generation",
        tooltip: "Generate multiple images at once",
        values: {
          Free: "2 max",
          Basic: "4 max",
          Professional: "8 max",
          Business: "16 max",
        },
      },
    ],
  },
  {
    name: "Prompt & Editing Tools",
    features: [
      {
        name: "Basic editing tools",
        tooltip: "Crop, resize, and adjust your images",
        values: {
          Free: true,
          Basic: true,
          Professional: true,
          Business: true,
        },
      },
      {
        name: "Advanced editing tools",
        tooltip: "Inpainting, outpainting, and fine adjustments",
        values: {
          Free: false,
          Basic: false,
          Professional: true,
          Business: true,
        },
      },
      {
        name: "Prompt history",
        tooltip: "Save and reuse your successful prompts",
        values: {
          Free: "Last 5",
          Basic: "Last 30",
          Professional: "Unlimited",
          Business: "Unlimited",
        },
      },
      {
        name: "Prompt templates",
        tooltip: "Pre-made templates for different styles and purposes",
        values: {
          Free: "5 basic",
          Basic: "20 templates",
          Professional: "All templates",
          Business: "All templates",
        },
      },
      {
        name: "AI prompt enhancement",
        tooltip: "AI-powered suggestions to improve your prompts",
        values: {
          Free: false,
          Basic: false,
          Professional: true,
          Business: true,
        },
      },
    ],
  },
  {
    name: "Organization",
    features: [
      {
        name: "Collections",
        tooltip: "Organize your images into collections",
        values: {
          Free: "1 collection",
          Basic: "10 collections",
          Professional: "Unlimited",
          Business: "Unlimited",
        },
      },
      {
        name: "Folders & tagging",
        tooltip: "Advanced organization with nested folders and tags",
        values: {
          Free: false,
          Basic: "Basic tagging",
          Professional: "Full access",
          Business: "Full access",
        },
      },
    ],
  },
  {
    name: "Export & Usage",
    features: [
      {
        name: "Download formats",
        tooltip: "Available formats for downloading your images",
        values: {
          Free: "JPG only",
          Basic: "JPG, PNG, WebP",
          Professional: "All formats",
          Business: "All formats",
        },
      },
      {
        name: "Watermark",
        tooltip: "Images include a watermark with our logo",
        values: {
          Free: true,
          Basic: false,
          Professional: false,
          Business: false,
        },
      },
      {
        name: "Commercial usage",
        tooltip: "Use images for commercial purposes",
        values: {
          Free: false,
          Basic: "Limited",
          Professional: true,
          Business: true,
        },
      },
      {
        name: "Bulk export",
        tooltip: "Export multiple images at once",
        values: {
          Free: false,
          Basic: "Up to 10",
          Professional: "Up to 50",
          Business: "Unlimited",
        },
      },
    ],
  },
  {
    name: "Support",
    features: [
      {
        name: "Customer support",
        tooltip: "Access to our support team",
        values: {
          Free: "Self-service",
          Basic: "Email support",
          Professional: "Priority support",
          Business: "Premium support",
        },
      },
      {
        name: "Response time",
        tooltip: "How quickly we respond to your inquiries",
        values: {
          Free: "N/A",
          Basic: "48 hours",
          Professional: "24 hours",
          Business: "4 hours",
        },
      },
      {
        name: "Storage duration",
        tooltip: "How long we store your generated images",
        values: {
          Free: "30 days",
          Basic: "90 days",
          Professional: "1 year",
          Business: "Unlimited",
        },
      },
    ],
  },
]

// FAQ data organized by categories
const faqCategories = [
  {
    name: "Frequently Asked Questions",
    questions: [
      // Billing & Pricing
      {
        question: "How does billing work and can I change my plan later?",
        answer:
          "We bill monthly or annually, with automatic renewal unless canceled. You can upgrade or downgrade anytime - upgrades give immediate access with prorated charges, while downgrades take effect at your next billing cycle. We offer a 7-day money-back guarantee for new subscriptions and a 20% discount for annual billing.",
      },
      // Features & Usage
      {
        question: "What happens if I use all my monthly generations?",
        answer:
          "If you reach your monthly generation limit, you won't be able to generate more images until your quota refreshes at the start of your next billing cycle. You can still access, edit, and download your existing images. If you need more generations, you can upgrade to a higher tier plan at any time.",
      },
      {
        question: "Can I use the generated images commercially?",
        answer:
          "Commercial usage rights vary by plan. Free plan users cannot use images commercially. Basic plan users have limited commercial rights (personal projects and small businesses with revenue under $10,000/year). Professional and Business plan users have full commercial rights to use the images in any project, including client work and commercial products.",
      },
      // Technical Questions
      {
        question: "Which AI models do you use and is my data secure?",
        answer:
          "We use state-of-the-art AI models from OpenAI (DALL-E) and keep them updated. Your data is secure and private - prompts and generated images are only visible to your account. We use industry-standard encryption and security practices. Images are stored for 90 days for Free/Basic users and indefinitely for Professional/Business users.",
      },
      {
        question: "What file formats do you support for downloads?",
        answer:
          "Free users can download in JPG format only. Basic users can download in JPG, PNG, and WebP formats. Professional and Business users can download in all supported formats, including JPG, PNG, WebP, TIFF, and PSD with layers for advanced editing.",
      },
      // Account & Support
      {
        question: "What kind of support do you offer?",
        answer:
          "Support varies by plan. Free users have access to our community forum and knowledge base. Basic users receive email support with a 48-hour response time. Professional users get priority email support with a 24-hour response time. Business users receive dedicated account management and phone support during business hours.",
      },
      {
        question: "Can I try before I buy?",
        answer:
          "Yes, our Free plan allows you to try the core functionality with 5 image generations per month. This gives you a chance to experience the quality and capabilities of our platform before committing to a paid plan. No credit card is required to sign up for the Free plan.",
      },
    ],
  },
]

// Generate placeholder avatar images
const generateAvatarUrl = (name: string) => {
  return `/placeholder.svg?height=80&width=80&query=professional headshot of ${name}`
}

// Update the PricingPlans component to handle billing cycle changes
export default function PricingPlans() {
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards")
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly")

  // Calculate savings percentage for annual billing
  const calculateSavings = (monthlyPrice: string, annualPrice: string) => {
    if (monthlyPrice === "$0" || annualPrice === "$0") return 0

    const monthly = Number.parseFloat(monthlyPrice.replace("$", ""))
    const annual = Number.parseFloat(annualPrice.replace("$", ""))

    const annualMonthlyEquivalent = annual / 12
    const savings = ((monthly - annualMonthlyEquivalent) / monthly) * 100

    return Math.round(savings)
  }

  // Process testimonials to ensure they have avatar URLs
  const processedPlans = plans.map((plan) => ({
    ...plan,
    testimonials: plan.testimonials?.map((testimonial) => ({
      ...testimonial,
      avatar: testimonial.avatar || generateAvatarUrl(testimonial.name),
    })),
    savingsPercentage: calculateSavings(plan.price, plan.annualPrice),
  }))

  return (
    <TooltipProvider>
      <section className="container py-24 md:py-32">
        <div className="mx-auto max-w-[58rem] text-center mb-16">
          <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl">Pricing Plans</h2>
          <p className="mt-4 text-muted-foreground sm:text-lg">Choose the perfect plan for your creative needs</p>

          <div className="mt-8 flex justify-center">
            <Tabs
              defaultValue="cards"
              className="w-[300px]"
              onValueChange={(value) => setViewMode(value as "cards" | "table")}
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="cards">Card View</TabsTrigger>
                <TabsTrigger value="table">Comparison Table</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Add billing cycle toggle */}
          <div className="mt-8 flex justify-center items-center">
            <div className="flex items-center space-x-2 bg-muted p-1 rounded-full">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  billingCycle === "monthly"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle("annual")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  billingCycle === "annual"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Annual
                <span className="ml-1.5 bg-primary/10 text-primary text-xs py-0.5 px-1.5 rounded-full">Save 20%</span>
              </button>
            </div>
          </div>
        </div>

        {viewMode === "cards" ? (
          <div className="space-y-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processedPlans.map((plan) => (
                <div
                  key={plan.name}
                  className={`relative rounded-lg border bg-background p-8 ${plan.popular ? "ring-2 ring-primary" : ""}`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-0 right-0 mx-auto w-fit rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                      Most Popular
                    </div>
                  )}
                  <div className="mb-8">
                    <h3 className="font-bold text-2xl">{plan.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{plan.description}</p>
                    <div className="mt-4 flex items-baseline">
                      <span className="text-4xl font-bold">
                        {billingCycle === "annual" ? plan.annualPrice : plan.price}
                      </span>
                      <span className="ml-1 text-muted-foreground">
                        {billingCycle === "annual" ? "/year" : "/month"}
                      </span>
                    </div>
                    {billingCycle === "annual" && plan.savingsPercentage > 0 && (
                      <div className="mt-1 text-xs text-primary">
                        Save {plan.savingsPercentage}% with annual billing
                      </div>
                    )}
                  </div>

                  <ul className="mb-8 space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center">
                        <Check className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                        {plan.tooltips && plan.tooltips[feature] && (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <HelpCircle className="h-4 w-4 ml-1.5 text-muted-foreground cursor-help" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="w-[200px] text-xs">{plan.tooltips[feature]}</p>
                            </TooltipContent>
                          </Tooltip>
                        )}
                      </li>
                    ))}
                  </ul>

                  <Button className="w-full" variant={plan.ctaVariant}>
                    {plan.cta}
                  </Button>
                </div>
              ))}
            </div>

            {/* Testimonials Section - Simplified */}
            <div className="mt-24">
              <h3 className="text-2xl font-bold text-center mb-12">What Our Users Say</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    name: "Emily Zhang",
                    role: "Digital Artist",
                    avatar: "/professional-headshot-emily-zhang.png",
                    quote:
                      "The Professional plan revolutionized my workflow. The high-res images are perfect for client work.",
                    rating: 5,
                    plan: "Professional",
                  },
                  {
                    name: "David Wilson",
                    role: "Marketing Agency Owner",
                    avatar: "/professional-headshot-david-wilson.png",
                    quote: "We've cut our image creation time by 70% while maintaining high quality for our clients.",
                    rating: 5,
                    plan: "Professional",
                  },
                  {
                    name: "Sarah Johnson",
                    role: "Content Creator",
                    avatar: "/confident-professional.png",
                    quote: "Being able to download without watermarks at this price point is a steal!",
                    rating: 5,
                    plan: "Basic",
                  },
                ].map((testimonial, index) => (
                  <Card key={index} className="overflow-hidden border border-border/50">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-12 w-12 border">
                          <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                          <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center mb-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < testimonial.rating ? "text-primary fill-primary" : "text-muted-foreground"
                                }`}
                              />
                            ))}
                          </div>
                          <h5 className="font-semibold">{testimonial.name}</h5>
                          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        </div>
                      </div>
                      <div className="mt-4 relative">
                        <Quote className="h-6 w-6 text-muted-foreground/30 absolute -top-1 -left-1" />
                        <p className="text-sm pl-5 italic">{testimonial.quote.replace(/Visiomancer/g, "Visionfy")}</p>
                      </div>
                      <div className="mt-3 pt-3 border-t border-border/50">
                        <span className="text-xs font-medium text-muted-foreground">{testimonial.plan} Plan User</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-8 overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
              {featureCategories.map((category, categoryIndex) => (
                <div key={category.name} className={categoryIndex > 0 ? "mt-12" : ""}>
                  <h3 className="text-xl font-semibold mb-4">{category.name}</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[250px]">Feature</TableHead>
                        {processedPlans.map((plan) => (
                          <TableHead key={plan.name} className="text-center">
                            <div className="font-medium">{plan.name}</div>
                            <div className="text-primary font-bold">
                              {billingCycle === "annual" ? plan.annualPrice : plan.price}
                              {billingCycle === "annual" ? "/yr" : "/mo"}
                            </div>
                          </TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {category.features.map((feature) => (
                        <TableRow key={feature.name}>
                          <TableCell className="font-medium">
                            <div className="flex items-center">
                              {feature.name}
                              {feature.tooltip && (
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <HelpCircle className="h-4 w-4 ml-1.5 text-muted-foreground cursor-help" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p className="w-[200px] text-xs">{feature.tooltip}</p>
                                  </TooltipContent>
                                </Tooltip>
                              )}
                            </div>
                          </TableCell>
                          {processedPlans.map((plan) => (
                            <TableCell key={plan.name} className="text-center">
                              {typeof feature.values[plan.name] === "boolean" ? (
                                feature.values[plan.name] ? (
                                  <Check className="h-5 w-5 text-primary mx-auto" />
                                ) : (
                                  <X className="h-5 w-5 text-muted-foreground mx-auto" />
                                )
                              ) : (
                                <span className={plan.popular ? "font-medium" : ""}>{feature.values[plan.name]}</span>
                              )}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FAQ Section */}
        <div className="mt-24">
          <div className="mx-auto max-w-4xl text-center">
            <h3 className="text-2xl font-bold mb-2">Frequently Asked Questions</h3>
            <p className="text-muted-foreground mb-12">
              Find answers to common questions about our pricing, features, and policies.
            </p>
          </div>

          <div className="mx-auto max-w-4xl">
            <Accordion type="single" collapsible className="w-full">
              {faqCategories[0].questions.map((faq, faqIndex) => (
                <AccordionItem key={faqIndex} value={`faq-${faqIndex}`}>
                  <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">Still have questions?</p>
            <Button variant="outline">Contact Support</Button>
          </div>
        </div>
      </section>
    </TooltipProvider>
  )
}
